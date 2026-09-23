import { NextRequest, NextResponse } from 'next/server';

// Standard major cities mapped by country for instantaneous, zero-failure lookup
const MAJOR_CITIES_MAP: Record<string, string[]> = {
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
  Bahrain: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A\'ali'],
  Tanzania: ['Dar es Salaam', 'Zanzibar City', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  Uganda: ['Kampala', 'Entebbe', 'Jinja', 'Gulu', 'Mbarara'],
  Ethiopia: ['Addis Ababa', 'Dire Dawa', 'Hawassa', 'Bahir Dar', 'Gondar'],
  Ghana: ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi', 'Cape Coast'],
  Kazakhstan: ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe'],
  Kyrgyzstan: ['Bishkek', 'Osh', 'Jalal-Abad', 'Karakol'],
  Tajikistan: ['Dushanbe', 'Khujand', 'Kulob', 'Bokhtar'],
  Russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  Egypt: ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Hurghada', 'Luxor'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Bordeaux'],
  Germany: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Düsseldorf', 'Stuttgart'],
  Iraq: ['Baghdad', 'Basra', 'Erbil', 'Najaf', 'Sulaymaniyah', 'Mosul'],
  Nepal: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Bharatpur'],
  'South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
  'Sri Lanka': ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo'],
  Turkey: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa'],
  Yemen: ['Sana\'a', 'Aden', 'Taiz', 'Al Hudaydah', 'Mukalla'],
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country') || '';
    const query = searchParams.get('q')?.toLowerCase() || '';

    // If country is in our high-speed lookup, return immediately
    let cities: string[] = MAJOR_CITIES_MAP[country] || [];

    // Fallback: If not found, attempt fetching from CountriesNow free API
    if (cities.length === 0 && country) {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country }),
          next: { revalidate: 86400 }, // Cache 24 hours
        });
        if (response.ok) {
          const json = await response.json();
          if (json.data && Array.isArray(json.data)) {
            cities = json.data.slice(0, 50); // limit to top 50
          }
        }
      } catch (err) {
        // Fallback default city is capital or capital representation
        cities = ['Capital / Main City', 'Other City'];
      }
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
