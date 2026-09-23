import { NextRequest, NextResponse } from 'next/server';

export interface WorldCountry {
  name: string;
  code: string;
  alpha2?: string;
  flag: string;
  dialCode: string;
  capital?: string;
  flagUrl?: string;
  popular?: boolean;
}

const API_TOKEN = process.env.RESTCOUNTRIES_API_TOKEN || 'rc_live_6504a9a2c12f4847be1c28dda2b91077';
const API_BASE_URL = 'https://api.restcountries.com/countries/v5';

// High-speed static list for instant UI rendering on load
const DEFAULT_COUNTRIES: WorldCountry[] = [
  { name: 'Oman', code: 'OMN', alpha2: 'OM', flag: '🇴🇲', dialCode: '+968', capital: 'Muscat', popular: true },
  { name: 'United Arab Emirates', code: 'ARE', alpha2: 'AE', flag: '🇦🇪', dialCode: '+971', capital: 'Abu Dhabi', popular: true },
  { name: 'Saudi Arabia', code: 'SAU', alpha2: 'SA', flag: '🇸🇦', dialCode: '+966', capital: 'Riyadh', popular: true },
  { name: 'Kenya', code: 'KEN', alpha2: 'KE', flag: '🇰🇪', dialCode: '+254', capital: 'Nairobi', popular: true },
  { name: 'Nigeria', code: 'NGA', alpha2: 'NG', flag: '🇳🇬', dialCode: '+234', capital: 'Abuja', popular: true },
  { name: 'Bangladesh', code: 'BGD', alpha2: 'BD', flag: '🇧🇩', dialCode: '+880', capital: 'Dhaka', popular: true },
  { name: 'Uzbekistan', code: 'UZB', alpha2: 'UZ', flag: '🇺🇿', dialCode: '+998', capital: 'Tashkent', popular: true },
  { name: 'Canada', code: 'CAN', alpha2: 'CA', flag: '🇨🇦', dialCode: '+1', capital: 'Ottawa', popular: true },
  { name: 'United Kingdom', code: 'GBR', alpha2: 'GB', flag: '🇬🇧', dialCode: '+44', capital: 'London', popular: true },
  { name: 'United States', code: 'USA', alpha2: 'US', flag: '🇺🇸', dialCode: '+1', capital: 'Washington, D.C.', popular: true },
  { name: 'India', code: 'IND', alpha2: 'IN', flag: '🇮🇳', dialCode: '+91', capital: 'New Delhi', popular: true },
  { name: 'Kuwait', code: 'KWT', alpha2: 'KW', flag: '🇰🇼', dialCode: '+965', capital: 'Kuwait City', popular: true },
  { name: 'Qatar', code: 'QAT', alpha2: 'QA', flag: '🇶🇦', dialCode: '+974', capital: 'Doha', popular: true },
  { name: 'Bahrain', code: 'BHR', alpha2: 'BH', flag: '🇧🇭', dialCode: '+973', capital: 'Manama', popular: true },
  { name: 'Tanzania', code: 'TZA', alpha2: 'TZ', flag: '🇹🇿', dialCode: '+255', capital: 'Dodoma', popular: true },
  { name: 'Uganda', code: 'UGA', alpha2: 'UG', flag: '🇺🇬', dialCode: '+256', capital: 'Kampala', popular: true },
  { name: 'Ethiopia', code: 'ETH', alpha2: 'ET', flag: '🇪🇹', dialCode: '+251', capital: 'Addis Ababa', popular: true },
  { name: 'Ghana', code: 'GHA', alpha2: 'GH', flag: '🇬🇭', dialCode: '+233', capital: 'Accra', popular: true },
  { name: 'Kazakhstan', code: 'KAZ', alpha2: 'KZ', flag: '🇰🇿', dialCode: '+7', capital: 'Astana', popular: true },
  { name: 'Kyrgyzstan', code: 'KGZ', alpha2: 'KG', flag: '🇰🇬', dialCode: '+996', capital: 'Bishkek', popular: true },
  { name: 'Tajikistan', code: 'TJK', alpha2: 'TJ', flag: '🇹🇯', dialCode: '+992', capital: 'Dushanbe', popular: true },
  { name: 'Russia', code: 'RUS', alpha2: 'RU', flag: '🇷🇺', dialCode: '+7', capital: 'Moscow', popular: true },
  { name: 'Australia', code: 'AUS', alpha2: 'AU', flag: '🇦🇺', dialCode: '+61', capital: 'Canberra', popular: true },
  { name: 'Germany', code: 'DEU', alpha2: 'DE', flag: '🇩🇪', dialCode: '+49', capital: 'Berlin', popular: true },
  { name: 'France', code: 'FRA', alpha2: 'FR', flag: '🇫🇷', dialCode: '+33', capital: 'Paris', popular: true },
  { name: 'Egypt', code: 'EGY', alpha2: 'EG', flag: '🇪🇬', dialCode: '+20', capital: 'Cairo', popular: true },
  { name: 'South Africa', code: 'ZAF', alpha2: 'ZA', flag: '🇿🇦', dialCode: '+27', capital: 'Pretoria', popular: true },
  { name: 'Senegal', code: 'SEN', alpha2: 'SN', flag: '🇸🇳', dialCode: '+221', capital: 'Dakar', popular: true },
  { name: 'Nepal', code: 'NPL', alpha2: 'NP', flag: '🇳🇵', dialCode: '+977', capital: 'Kathmandu' },
  { name: 'Sri Lanka', code: 'LKA', alpha2: 'LK', flag: '🇱🇰', dialCode: '+94', capital: 'Colombo' },
  { name: 'Turkey', code: 'TUR', alpha2: 'TR', flag: '🇹🇷', dialCode: '+90', capital: 'Ankara' },
  { name: 'Yemen', code: 'YEM', alpha2: 'YE', flag: '🇾🇪', dialCode: '+967', capital: 'Sana\'a' },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim() || '';

    let liveResults: WorldCountry[] = [];

    // If search query is provided, query api.restcountries.com/countries/v5 using Bearer token
    if (query) {
      try {
        const apiUrl = `${API_BASE_URL}?q=${encodeURIComponent(query)}&pretty=1`;
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'User-Agent': 'curl/8.7.1',
          },
          next: { revalidate: 3600 }, // Cache 1 hour
        });

        if (res.ok) {
          const json = await res.json();
          const objects = json?.data?.objects || [];

          liveResults = objects.map((obj: any) => {
            const commonName = obj?.names?.common || obj?.names?.official || '';
            const alpha3 = obj?.codes?.alpha_3 || '';
            const alpha2 = obj?.codes?.alpha_2 || '';
            const emoji = obj?.flag?.emoji || '🏳️';
            const flagUrl = obj?.flag?.url_png || obj?.flag?.url_svg || '';
            const callingCodes = obj?.calling_codes || [];
            const dialCode = callingCodes.length > 0 ? `+${callingCodes[0]}` : '+';
            const capitals = obj?.capitals || [];
            const capital = capitals[0]?.name || '';

            return {
              name: commonName,
              code: alpha3 || alpha2,
              alpha2,
              flag: emoji,
              flagUrl,
              dialCode,
              capital,
            };
          }).filter((c: WorldCountry) => Boolean(c.name));
        }
      } catch (apiErr) {
        console.warn('api.restcountries.com call error, falling back to local dataset:', apiErr);
      }
    }

    // Merge live results with local search filter to guarantee complete coverage
    const qLower = query.toLowerCase();
    const localMatches = query
      ? DEFAULT_COUNTRIES.filter(
          (c) =>
            c.name.toLowerCase().includes(qLower) ||
            c.code.toLowerCase().includes(qLower) ||
            c.dialCode.includes(query)
        )
      : DEFAULT_COUNTRIES;

    // Deduplicate by country name
    const combinedMap = new Map<string, WorldCountry>();
    
    // Add live API results first
    for (const c of liveResults) {
      combinedMap.set(c.name.toLowerCase(), c);
    }
    // Add local matches if not already present
    for (const c of localMatches) {
      if (!combinedMap.has(c.name.toLowerCase())) {
        combinedMap.set(c.name.toLowerCase(), c);
      }
    }

    const finalCountries = Array.from(combinedMap.values());

    return NextResponse.json({
      success: true,
      query,
      source: liveResults.length > 0 ? 'api.restcountries.com/countries/v5' : 'curated',
      total: finalCountries.length,
      data: finalCountries,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch countries' },
      { status: 500 }
    );
  }
}
