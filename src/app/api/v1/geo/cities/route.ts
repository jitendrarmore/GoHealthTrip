import { NextRequest, NextResponse } from 'next/server';

const API_TOKEN = process.env.RESTCOUNTRIES_API_TOKEN || 'rc_live_6504a9a2c12f4847be1c28dda2b91077';
const API_BASE_URL = 'https://api.restcountries.com/countries/v5';

// Known major cities mapped by country for instantaneous, zero-delay autocomplete
const MAJOR_CITIES_MAP: Record<string, string[]> = {
  Canada: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Quebec City', 'Winnipeg'],
  Oman: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Seeb', 'Barka', 'Rustaq', 'Ibri', 'Khasab'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Ras Al Khaimah', 'Fujairah'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Tabuk', 'Abha'],
  Kenya: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Malindi', 'Thika'],
  Nigeria: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Enugu', 'Kaduna'],
  Bangladesh: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Comilla'],
  Uzbekistan: ['Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 'Namangan', 'Fergana', 'Nukus', 'Khiva'],
  'United Kingdom': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Leeds', 'Edinburgh', 'Liverpool', 'Bristol'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco', 'Dallas', 'Atlanta', 'Seattle', 'Boston'],
  Kuwait: ['Kuwait City', 'Hawally', 'Salmiya', 'Al Ahmadi', 'Farwaniya', 'Jahra'],
  Qatar: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Umm Salal'],
  Bahrain: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town'],
  Tanzania: ['Dar es Salaam', 'Zanzibar City', 'Mwanza', 'Arusha', 'Dodoma'],
  Uganda: ['Kampala', 'Entebbe', 'Jinja', 'Gulu'],
  Ethiopia: ['Addis Ababa', 'Dire Dawa', 'Hawassa', 'Bahir Dar'],
  Ghana: ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi'],
  Kazakhstan: ['Almaty', 'Astana', 'Shymkent', 'Karaganda'],
  Kyrgyzstan: ['Bishkek', 'Osh', 'Jalal-Abad'],
  Tajikistan: ['Dushanbe', 'Khujand', 'Kulob'],
  Russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  Egypt: ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  Germany: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
  India: ['New Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata', 'Gurugram'],
  Nepal: ['Kathmandu', 'Pokhara', 'Lalitpur'],
  'South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'],
  'Sri Lanka': ['Colombo', 'Kandy', 'Galle', 'Jaffna'],
  Turkey: ['Istanbul', 'Ankara', 'Izmir', 'Antalya'],
  Yemen: ['Sana\'a', 'Aden', 'Taiz'],
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country') || '';
    const query = searchParams.get('q')?.toLowerCase() || '';

    let cities: string[] = MAJOR_CITIES_MAP[country] || [];

    // Also query api.restcountries.com/countries/v5 to fetch official capital city
    if (country) {
      try {
        const apiUrl = `${API_BASE_URL}?q=${encodeURIComponent(country)}&pretty=1`;
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'User-Agent': 'curl/8.7.1',
          },
          next: { revalidate: 86400 },
        });

        if (res.ok) {
          const json = await res.json();
          const obj = json?.data?.objects?.[0];
          if (obj?.capitals && Array.isArray(obj.capitals)) {
            const capitalName = obj.capitals[0]?.name;
            if (capitalName && !cities.includes(capitalName)) {
              cities = [capitalName, ...cities];
            }
          }
        }
      } catch (err) {
        console.warn('API fetch capital error:', err);
      }
    }

    if (cities.length === 0) {
      cities = ['Capital / Main City', 'Central City', 'Other City'];
    }

    if (query) {
      cities = cities.filter((c) => c.toLowerCase().includes(query));
    }

    return NextResponse.json({
      success: true,
      country,
      total: cities.length,
      data: cities,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}
