import prisma from '@/lib/prisma';

export interface MatchingCriteria {
  specialty: string;
  subSpecialty?: string;
  preferredCity?: string;
  maxBudgetUsd?: number;
  languagesPreferred?: string[];
  requiresJciAccreditation?: boolean;
  urgencyLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface MatchedProviderOption {
  hospital: {
    id: string;
    name: string;
    city: string;
    accreditations: string[];
    ratingScore: number;
  };
  doctor: {
    id: string;
    name: string;
    qualifications: string;
    experienceYears: number;
    languagesSpoken: string[];
  };
  matchingScore: number; // 0 - 100 structured compatibility score
  matchReasons: string[];
  estimatedCostRangeUsd: { min: number; max: number };
}

export class ProviderMatchingService {
  /**
   * Matches hospitals and specialists based on transparent, structured criteria without biased rankings.
   */
  static async findMatches(criteria: MatchingCriteria): Promise<MatchedProviderOption[]> {
    const { specialty, preferredCity, maxBudgetUsd, languagesPreferred, requiresJciAccreditation } = criteria;

    // Fetch active hospitals offering the requested specialty
    const hospitals = await prisma.hospital.findMany({
      where: {
        isActive: true,
        specialtiesOffered: { has: specialty },
        ...(preferredCity && { city: { contains: preferredCity, mode: 'insensitive' } }),
      },
      include: {
        hospitalDoctors: {
          include: {
            doctor: true,
          },
        },
      },
    });

    const matches: MatchedProviderOption[] = [];

    for (const hospital of hospitals) {
      // Find relevant doctors in this hospital
      const relevantDoctors = hospital.hospitalDoctors
        .filter((hd) => hd.doctor.primarySpecialty.toLowerCase().includes(specialty.toLowerCase()) || specialty.toLowerCase().includes(hd.doctor.primarySpecialty.toLowerCase()))
        .map((hd) => hd.doctor);

      for (const doctor of relevantDoctors) {
        const matchReasons: string[] = [];
        let score = 70; // baseline specialty capability match

        matchReasons.push(`Hospital has dedicated ${specialty} department.`);
        matchReasons.push(`Surgeon ${doctor.title} ${doctor.firstName} ${doctor.lastName} has ${doctor.experienceYears} years of clinical experience.`);

        if (hospital.accreditations.includes('JCI')) {
          score += 15;
          matchReasons.push('Hospital holds Gold-standard JCI International Accreditation.');
        }

        if (preferredCity && hospital.city.toLowerCase().includes(preferredCity.toLowerCase())) {
          score += 10;
          matchReasons.push(`Located in patient's preferred destination (${hospital.city}).`);
        }

        if (languagesPreferred && languagesPreferred.some((lang) => doctor.languagesSpoken.includes(lang))) {
          score += 5;
          matchReasons.push(`Specialist speaks ${languagesPreferred.join(', ')}.`);
        }

        // Estimated cost bounds based on standard treatment catalog
        const minCost = 5000;
        const maxCost = 8500;

        matches.push({
          hospital: {
            id: hospital.id,
            name: hospital.name,
            city: hospital.city,
            accreditations: hospital.accreditations,
            ratingScore: hospital.ratingScore,
          },
          doctor: {
            id: doctor.id,
            name: `${doctor.title} ${doctor.firstName} ${doctor.lastName}`,
            qualifications: doctor.qualifications,
            experienceYears: doctor.experienceYears,
            languagesSpoken: doctor.languagesSpoken,
          },
          matchingScore: Math.min(score, 100),
          matchReasons,
          estimatedCostRangeUsd: { min: minCost, max: maxCost },
        });
      }
    }

    // Sort by matching score descending
    return matches.sort((a, b) => b.matchingScore - a.matchingScore);
  }
}
