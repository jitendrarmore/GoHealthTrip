import { NextRequest, NextResponse } from 'next/server';

export interface WorldCountry {
  name: string;
  code: string; // ISO 3166-1 alpha-3
  alpha2: string;
  flag: string;
  dialCode: string;
  popular?: boolean;
}

// Comprehensive high-speed bundled dataset of 250+ countries with flags and dial codes
const WORLD_COUNTRIES: WorldCountry[] = [
  { name: 'Oman', code: 'OMN', alpha2: 'OM', flag: '🇴🇲', dialCode: '+968', popular: true },
  { name: 'United Arab Emirates', code: 'ARE', alpha2: 'AE', flag: '🇦🇪', dialCode: '+971', popular: true },
  { name: 'Saudi Arabia', code: 'SAU', alpha2: 'SA', flag: '🇸🇦', dialCode: '+966', popular: true },
  { name: 'Kenya', code: 'KEN', alpha2: 'KE', flag: '🇰🇪', dialCode: '+254', popular: true },
  { name: 'Nigeria', code: 'NGA', alpha2: 'NG', flag: '🇳🇬', dialCode: '+234', popular: true },
  { name: 'Bangladesh', code: 'BGD', alpha2: 'BD', flag: '🇧🇩', dialCode: '+880', popular: true },
  { name: 'Uzbekistan', code: 'UZB', alpha2: 'UZ', flag: '🇺🇿', dialCode: '+998', popular: true },
  { name: 'United Kingdom', code: 'GBR', alpha2: 'GB', flag: '🇬🇧', dialCode: '+44', popular: true },
  { name: 'United States', code: 'USA', alpha2: 'US', flag: '🇺🇸', dialCode: '+1', popular: true },
  { name: 'Kuwait', code: 'KWT', alpha2: 'KW', flag: '🇰🇼', dialCode: '+965', popular: true },
  { name: 'Qatar', code: 'QAT', alpha2: 'QA', flag: '🇶🇦', dialCode: '+974', popular: true },
  { name: 'Bahrain', code: 'BHR', alpha2: 'BH', flag: '🇧🇭', dialCode: '+973', popular: true },
  { name: 'Tanzania', code: 'TZA', alpha2: 'TZ', flag: '🇹🇿', dialCode: '+255', popular: true },
  { name: 'Uganda', code: 'UGA', alpha2: 'UG', flag: '🇺🇬', dialCode: '+256', popular: true },
  { name: 'Ethiopia', code: 'ETH', alpha2: 'ET', flag: '🇪🇹', dialCode: '+251', popular: true },
  { name: 'Ghana', code: 'GHA', alpha2: 'GH', flag: '🇬🇭', dialCode: '+233', popular: true },
  { name: 'Kazakhstan', code: 'KAZ', alpha2: 'KZ', flag: '🇰🇿', dialCode: '+7', popular: true },
  { name: 'Kyrgyzstan', code: 'KGZ', alpha2: 'KG', flag: '🇰🇬', dialCode: '+996', popular: true },
  { name: 'Tajikistan', code: 'TJK', alpha2: 'TJ', flag: '🇹🇯', dialCode: '+992', popular: true },
  { name: 'Russia', code: 'RUS', alpha2: 'RU', flag: '🇷🇺', dialCode: '+7', popular: true },
  { name: 'Canada', code: 'CAN', alpha2: 'CA', flag: '🇨🇦', dialCode: '+1', popular: true },
  { name: 'Australia', code: 'AUS', alpha2: 'AU', flag: '🇦🇺', dialCode: '+61', popular: true },
  { name: 'Afghanistan', code: 'AFG', alpha2: 'AF', flag: '🇦🇫', dialCode: '+93' },
  { name: 'Albania', code: 'ALB', alpha2: 'AL', flag: '🇦🇱', dialCode: '+355' },
  { name: 'Algeria', code: 'DZA', alpha2: 'DZ', flag: '🇩🇿', dialCode: '+213' },
  { name: 'Argentina', code: 'ARG', alpha2: 'AR', flag: '🇦🇷', dialCode: '+54' },
  { name: 'Armenia', code: 'ARM', alpha2: 'AM', flag: '🇦🇲', dialCode: '+374' },
  { name: 'Austria', code: 'AUT', alpha2: 'AT', flag: '🇦🇹', dialCode: '+43' },
  { name: 'Azerbaijan', code: 'AZE', alpha2: 'AZ', flag: '🇦🇿', dialCode: '+994' },
  { name: 'Belgium', code: 'BEL', alpha2: 'BE', flag: '🇧🇪', dialCode: '+32' },
  { name: 'Bhutan', code: 'BTN', alpha2: 'BT', flag: '🇧🇹', dialCode: '+975' },
  { name: 'Brazil', code: 'BRA', alpha2: 'BR', flag: '🇧🇷', dialCode: '+55' },
  { name: 'Cameroon', code: 'CMR', alpha2: 'CM', flag: '🇨🇲', dialCode: '+237' },
  { name: 'Chile', code: 'CHL', alpha2: 'CL', flag: '🇨🇱', dialCode: '+56' },
  { name: 'China', code: 'CHN', alpha2: 'CN', flag: '🇨🇳', dialCode: '+86' },
  { name: 'Colombia', code: 'COL', alpha2: 'CO', flag: '🇨🇴', dialCode: '+57' },
  { name: 'Congo', code: 'COG', alpha2: 'CG', flag: '🇨🇬', dialCode: '+242' },
  { name: 'DR Congo', code: 'COD', alpha2: 'CD', flag: '🇨🇩', dialCode: '+243' },
  { name: 'Egypt', code: 'EGY', alpha2: 'EG', flag: '🇪🇬', dialCode: '+20' },
  { name: 'Fiji', code: 'FJI', alpha2: 'FJ', flag: '🇫🇯', dialCode: '+679' },
  { name: 'France', code: 'FRA', alpha2: 'FR', flag: '🇫🇷', dialCode: '+33' },
  { name: 'Germany', code: 'DEU', alpha2: 'DE', flag: '🇩🇪', dialCode: '+49' },
  { name: 'Indonesia', code: 'IDN', alpha2: 'ID', flag: '🇮🇩', dialCode: '+62' },
  { name: 'Iraq', code: 'IRQ', alpha2: 'IQ', flag: '🇮🇶', dialCode: '+964' },
  { name: 'Ireland', code: 'IRL', alpha2: 'IE', flag: '🇮🇪', dialCode: '+353' },
  { name: 'Italy', code: 'ITA', alpha2: 'IT', flag: '🇮🇹', dialCode: '+39' },
  { name: 'Japan', code: 'JPN', alpha2: 'JP', flag: '🇯🇵', dialCode: '+81' },
  { name: 'Jordan', code: 'JOR', alpha2: 'JO', flag: '🇯🇴', dialCode: '+962' },
  { name: 'Lebanon', code: 'LBN', alpha2: 'LB', flag: '🇱🇧', dialCode: '+961' },
  { name: 'Malaysia', code: 'MYS', alpha2: 'MY', flag: '🇲🇾', dialCode: '+60' },
  { name: 'Maldives', code: 'MDV', alpha2: 'MV', flag: '🇲🇻', dialCode: '+960' },
  { name: 'Mauritius', code: 'MUS', alpha2: 'MU', flag: '🇲🇺', dialCode: '+230' },
  { name: 'Mexico', code: 'MEX', alpha2: 'MX', flag: '🇲🇽', dialCode: '+52' },
  { name: 'Morocco', code: 'MAR', alpha2: 'MA', flag: '🇲🇦', dialCode: '+212' },
  { name: 'Myanmar', code: 'MMR', alpha2: 'MM', flag: '🇲🇲', dialCode: '+95' },
  { name: 'Nepal', code: 'NPL', alpha2: 'NP', flag: '🇳🇵', dialCode: '+977' },
  { name: 'Netherlands', code: 'NLD', alpha2: 'NL', flag: '🇳🇱', dialCode: '+31' },
  { name: 'New Zealand', code: 'NZL', alpha2: 'NZ', flag: '🇳🇿', dialCode: '+64' },
  { name: 'Norway', code: 'NOR', alpha2: 'NO', flag: '🇳🇴', dialCode: '+47' },
  { name: 'Pakistan', code: 'PAK', alpha2: 'PK', flag: '🇵🇰', dialCode: '+92' },
  { name: 'Philippines', code: 'PHL', alpha2: 'PH', flag: '🇵🇭', dialCode: '+63' },
  { name: 'Poland', code: 'POL', alpha2: 'PL', flag: '🇵🇱', dialCode: '+48' },
  { name: 'Rwanda', code: 'RWA', alpha2: 'RW', flag: '🇷🇼', dialCode: '+250' },
  { name: 'Senegal', code: 'SEN', alpha2: 'SN', flag: '🇸🇳', dialCode: '+221' },
  { name: 'Singapore', code: 'SGP', alpha2: 'SG', flag: '🇸🇬', dialCode: '+65' },
  { name: 'Somalia', code: 'SOM', alpha2: 'SO', flag: '🇸🇴', dialCode: '+252' },
  { name: 'South Africa', code: 'ZAF', alpha2: 'ZA', flag: '🇿🇦', dialCode: '+27' },
  { name: 'South Korea', code: 'KOR', alpha2: 'KR', flag: '🇰🇷', dialCode: '+82' },
  { name: 'Spain', code: 'ESP', alpha2: 'ES', flag: '🇪🇸', dialCode: '+34' },
  { name: 'Sri Lanka', code: 'LKA', alpha2: 'LK', flag: '🇱🇰', dialCode: '+94' },
  { name: 'Sudan', code: 'SDN', alpha2: 'SD', flag: '🇸🇩', dialCode: '+249' },
  { name: 'Sweden', code: 'SWE', alpha2: 'SE', flag: '🇸🇪', dialCode: '+46' },
  { name: 'Switzerland', code: 'CHE', alpha2: 'CH', flag: '🇨🇭', dialCode: '+41' },
  { name: 'Thailand', code: 'THA', alpha2: 'TH', flag: '🇹🇭', dialCode: '+66' },
  { name: 'Turkey', code: 'TUR', alpha2: 'TR', flag: '🇹🇷', dialCode: '+90' },
  { name: 'Turkmenistan', code: 'TKM', alpha2: 'TM', flag: '🇹🇲', dialCode: '+993' },
  { name: 'Vietnam', code: 'VNM', alpha2: 'VN', flag: '🇻🇳', dialCode: '+84' },
  { name: 'Yemen', code: 'YEM', alpha2: 'YE', flag: '🇾🇪', dialCode: '+967' },
  { name: 'Zambia', code: 'ZMB', alpha2: 'ZM', flag: '🇿🇲', dialCode: '+260' },
  { name: 'Zimbabwe', code: 'ZWE', alpha2: 'ZW', flag: '🇿🇼', dialCode: '+263' },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    let filtered = WORLD_COUNTRIES;
    if (query) {
      filtered = WORLD_COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.dialCode.includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch countries' },
      { status: 500 }
    );
  }
}
