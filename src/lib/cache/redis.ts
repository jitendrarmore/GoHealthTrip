import { Redis } from '@upstash/redis';

// In-memory LRU cache fallback for local/build environment
class InMemoryCache {
  private store = new Map<string, { value: any; expiry: number }>();

  async get(key: string): Promise<any | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    this.store.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  async setnx(key: string, value: any, ttlSeconds = 60): Promise<number> {
    if (await this.get(key)) return 0;
    await this.set(key, value, ttlSeconds);
    return 1;
  }
}

let redisClient: Redis | null = null;
const memoryFallback = new InMemoryCache();

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

if (redisUrl && redisToken) {
  try {
    redisClient = new Redis({
      url: redisUrl,
      token: redisToken,
    });
  } catch (e) {
    console.warn('⚠️ Upstash/Vercel KV initialization skipped, using in-memory cache.');
  }
}

export class CacheService {
  /**
   * Get cached item
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      if (redisClient) {
        return (await redisClient.get(key)) as T;
      }
      return (await memoryFallback.get(key)) as T;
    } catch (error) {
      console.warn(`Cache get failed for key "${key}":`, error);
      return null;
    }
  }

  /**
   * Set cached item with TTL in seconds
   */
  static async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    try {
      if (redisClient) {
        await redisClient.set(key, value, { ex: ttlSeconds });
      } else {
        await memoryFallback.set(key, value, ttlSeconds);
      }
    } catch (error) {
      console.warn(`Cache set failed for key "${key}":`, error);
    }
  }

  /**
   * Delete cached item (cache invalidation)
   */
  static async delete(key: string): Promise<void> {
    try {
      if (redisClient) {
        await redisClient.del(key);
      } else {
        await memoryFallback.del(key);
      }
    } catch (error) {
      console.warn(`Cache delete failed for key "${key}":`, error);
    }
  }

  static async del(key: string): Promise<void> {
    return this.delete(key);
  }

  /**
   * Cache-aside pattern: Fetch from cache or compute and cache
   */
  static async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttlSeconds = 3600): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null && cached !== undefined) {
      return cached;
    }
    const fresh = await fetcher();
    await this.set(key, fresh, ttlSeconds);
    return fresh;
  }

  /**
   * Distributed Lock for Idempotency and Race Prevention
   */
  static async acquireLock(lockKey: string, ttlSeconds = 30): Promise<boolean> {
    try {
      const fullKey = `lock:${lockKey}`;
      if (redisClient) {
        const acquired = await redisClient.set(fullKey, 'locked', {
          nx: true,
          ex: ttlSeconds,
        });
        return !!acquired;
      } else {
        const res = await memoryFallback.setnx(fullKey, 'locked', ttlSeconds);
        return res === 1;
      }
    } catch (error) {
      console.warn(`Lock acquisition failed for "${lockKey}":`, error);
      return true; // fail-open for resilience
    }
  }

  /**
   * Release lock
   */
  static async releaseLock(lockKey: string): Promise<void> {
    const fullKey = `lock:${lockKey}`;
    await this.delete(fullKey);
  }
}

export default CacheService;
