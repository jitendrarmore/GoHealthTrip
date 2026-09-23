// Mem0 AI Memory Integration for International Medical Travel Context

export interface Mem0Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class Mem0Client {
  private static readonly API_KEY = process.env.MEM0_API_KEY || 'm0-EYuSVVB0QZQxJNoTKFaM2qGKZRHvEkQjoS67g3qI';
  private static readonly BASE_URL = process.env.MEM0_BASE_URL || 'https://api.mem0.ai';
  private static readonly ORG_ID = process.env.MEM0_ORG_ID || 'org_tatZITYMqejwJX1ufFC4jzmtSuclWkvvWXPqI1t8';
  private static readonly PROJECT_ID = process.env.MEM0_PROJECT_ID || 'proj_imz3bzHdfO30FWcy8oEqouW76CC9cpe8qZi57vaB';

  /**
   * Stores patient travel & clinical preferences into Mem0 vector memory
   */
  static async addMemory(userId: string, messages: Mem0Message[]): Promise<any> {
    try {
      const res = await fetch(`${this.BASE_URL}/v1/memories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.API_KEY}`,
        },
        body: JSON.stringify({
          messages,
          user_id: userId,
          org_id: this.ORG_ID,
          project_id: this.PROJECT_ID,
        }),
      });

      if (!res.ok) {
        console.warn('Mem0 addMemory failed:', await res.text());
        return null;
      }

      return await res.json();
    } catch (e) {
      console.warn('Mem0 network error:', e);
      return null;
    }
  }

  /**
   * Retrieves relevant clinical context and preferences for a patient
   */
  static async searchMemories(userId: string, query: string): Promise<string[]> {
    try {
      const res = await fetch(`${this.BASE_URL}/v1/memories/search/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.API_KEY}`,
        },
        body: JSON.stringify({
          query,
          user_id: userId,
          org_id: this.ORG_ID,
          project_id: this.PROJECT_ID,
        }),
      });

      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data.map((item: any) => item.memory || item.text) : [];
    } catch (e) {
      return [];
    }
  }
}
