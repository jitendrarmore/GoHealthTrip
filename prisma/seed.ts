import { PrismaClient, UserRoleType, UserStatus, Gender, IdentityDocumentType, IdentityVerificationStatus, CasePriority, MedicalCaseStage, DocumentCategory, DocumentStatus, VirusScanStatus, EstimateType, EstimateStatus, ProposalStatus, VisaType, VisaStatus, TravelPlanStatus, TransportType, BookingStatus, AdmissionStatus, PaymentCategory, PaymentStatus, ConsentType, AuditAction } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting GoHealthTrip Database Seeding (DEMO Data)...');

  // 1. CLEAR EXISTING DATA (In Reverse Dependency Order)
  await prisma.auditLog.deleteMany();
  await prisma.consent.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.referralTransaction.deleteMany();
  await prisma.referralAgreement.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.followUp.deleteMany();
  await prisma.discharge.deleteMany();
  await prisma.treatmentEpisode.deleteMany();
  await prisma.hospitalAdmission.deleteMany();
  await prisma.transportBooking.deleteMany();
  await prisma.transportProvider.deleteMany();
  await prisma.hotelBooking.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.travelPlan.deleteMany();
  await prisma.visaDocument.deleteMany();
  await prisma.visaCase.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.treatmentProposal.deleteMany();
  await prisma.treatmentEstimate.deleteMany();
  await prisma.treatmentPackage.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.hospitalDoctor.deleteMany();
  await prisma.hospitalDepartment.deleteMany();
  await prisma.clinicalReview.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.medicalDocumentVersion.deleteMany();
  await prisma.medicalDocument.deleteMany();
  await prisma.medicalCondition.deleteMany();
  await prisma.medicalCase.deleteMany();
  await prisma.patientCompanion.deleteMany();
  await prisma.patientIdentity.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.countryConfiguration.deleteMany();
  await prisma.country.deleteMany();
  await prisma.language.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.careCoordinator.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing tables.');

  const passwordHash = await bcrypt.hash('DemoPass@2026', 10);

  // 2. LANGUAGES
  const langEn = await prisma.language.create({ data: { code: 'en', name: 'English', nativeName: 'English', isRtl: false } });
  const langAr = await prisma.language.create({ data: { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRtl: true } });
  const langSw = await prisma.language.create({ data: { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', isRtl: false } });
  const langBn = await prisma.language.create({ data: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', isRtl: false } });
  const langRu = await prisma.language.create({ data: { code: 'ru', name: 'Russian', nativeName: 'Русский', isRtl: false } });
  const langFr = await prisma.language.create({ data: { code: 'fr', name: 'French', nativeName: 'Français', isRtl: false } });

  console.log('🌐 Seeded Languages');

  // 3. COUNTRIES & CONFIGURATIONS
  const countryIndia = await prisma.country.create({
    data: {
      code: 'IND',
      name: 'India (Headquarters)',
      phonePrefix: '+91',
      currencyCode: 'INR',
      flagIconUrl: '🇮🇳'
    }
  });

  const countryOman = await prisma.country.create({
    data: {
      code: 'OMN',
      name: 'Oman',
      phonePrefix: '+968',
      currencyCode: 'OMR',
      flagIconUrl: '🇴🇲',
      configuration: {
        create: {
          allowedIdentityProviders: ['VERIFF', 'MANUAL'],
          passportMinValidityMonths: 6,
          visaTypeRequired: VisaType.INDIAN_E_MEDICAL_VISA,
          maxAttendantsAllowed: 2,
          requiresDocumentTranslation: false,
          allowedPaymentMethods: ['CARD', 'WIRE_TRANSFER', 'FLYWIRE'],
          requiredDocChecklist: ['PASSPORT_COPY', 'LOCAL_DOCTOR_SUMMARY', 'RECENT_IMAGING_OR_LABS'],
          embassyAdvisoryNotes: 'Direct e-Medical Visa eligible for 60 days with triple entry.'
        }
      }
    }
  });

  const countryKenya = await prisma.country.create({
    data: {
      code: 'KEN',
      name: 'Kenya',
      phonePrefix: '+254',
      currencyCode: 'KES',
      flagIconUrl: '🇰🇪',
      configuration: {
        create: {
          allowedIdentityProviders: ['VERIFF', 'PERSONA', 'MANUAL'],
          passportMinValidityMonths: 6,
          visaTypeRequired: VisaType.INDIAN_E_MEDICAL_VISA,
          maxAttendantsAllowed: 2,
          requiresDocumentTranslation: false,
          allowedPaymentMethods: ['CARD', 'WIRE_TRANSFER', 'FLYWIRE'],
          requiredDocChecklist: ['PASSPORT_COPY', 'NHIF_OR_CONSULTANT_LETTER', 'DIAGNOSTIC_REPORTS'],
          embassyAdvisoryNotes: 'Yellow fever vaccination certificate mandatory for return travel.'
        }
      }
    }
  });

  const countryUAE = await prisma.country.create({
    data: {
      code: 'ARE',
      name: 'United Arab Emirates',
      phonePrefix: '+971',
      currencyCode: 'AED',
      flagIconUrl: '🇦🇪',
      configuration: {
        create: {
          allowedIdentityProviders: ['VERIFF', 'PERSONA'],
          passportMinValidityMonths: 6,
          visaTypeRequired: VisaType.INDIAN_E_MEDICAL_VISA,
          maxAttendantsAllowed: 2,
          requiresDocumentTranslation: false,
          allowedPaymentMethods: ['CARD', 'WIRE_TRANSFER'],
          requiredDocChecklist: ['PASSPORT_COPY', 'HOSPITAL_REFERRAL', 'MRI_CT_SCANS']
        }
      }
    }
  });

  const countryNigeria = await prisma.country.create({
    data: {
      code: 'NGA',
      name: 'Nigeria',
      phonePrefix: '+234',
      currencyCode: 'NGN',
      flagIconUrl: '🇳🇬',
      configuration: {
        create: {
          allowedIdentityProviders: ['VERIFF', 'MANUAL'],
          passportMinValidityMonths: 6,
          visaTypeRequired: VisaType.INDIAN_REGULAR_MEDICAL_VISA,
          maxAttendantsAllowed: 2,
          requiresDocumentTranslation: false,
          allowedPaymentMethods: ['WIRE_TRANSFER', 'FLYWIRE'],
          requiredDocChecklist: ['PASSPORT_BIO_PAGE', 'LOCAL_CONSULTANT_NOTE', 'HOSPITAL_INVITATION_LETTER']
        }
      }
    }
  });

  const countryBangladesh = await prisma.country.create({
    data: {
      code: 'BGD',
      name: 'Bangladesh',
      phonePrefix: '+880',
      currencyCode: 'BDT',
      flagIconUrl: '🇧🇩',
      configuration: {
        create: {
          allowedIdentityProviders: ['MANUAL', 'VERIFF'],
          passportMinValidityMonths: 6,
          visaTypeRequired: VisaType.INDIAN_REGULAR_MEDICAL_VISA,
          maxAttendantsAllowed: 3,
          requiresDocumentTranslation: false,
          allowedPaymentMethods: ['BANK_TRANSFER', 'CARD'],
          requiredDocChecklist: ['PASSPORT_COPY', 'INDIAN_DOCTOR_APPOINTMENT', 'LOCAL_DIAGNOSTICS']
        }
      }
    }
  });

  const countryUzbekistan = await prisma.country.create({
    data: {
      code: 'UZB',
      name: 'Uzbekistan',
      phonePrefix: '+998',
      currencyCode: 'UZS',
      flagIconUrl: '🇺🇿',
      configuration: {
        create: {
          allowedIdentityProviders: ['VERIFF', 'MANUAL'],
          passportMinValidityMonths: 6,
          visaTypeRequired: VisaType.INDIAN_E_MEDICAL_VISA,
          maxAttendantsAllowed: 2,
          requiresDocumentTranslation: true,
          allowedPaymentMethods: ['CARD', 'WIRE_TRANSFER'],
          requiredDocChecklist: ['PASSPORT_COPY', 'TRANSLATED_MEDICAL_HISTORY', 'RECENT_SCANS']
        }
      }
    }
  });

  console.log('🌍 Seeded Countries and Configuration Engines');

  // 4. USERS & ROLES
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@gohealthtrip.com',
      passwordHash,
      role: UserRoleType.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      isMfaEnabled: true
    }
  });

  const coordinatorUser = await prisma.user.create({
    data: {
      email: 'sarah.coordinator@gohealthtrip.com',
      phone: '+919810012345',
      passwordHash,
      role: UserRoleType.CARE_COORDINATOR,
      status: UserStatus.ACTIVE,
      careCoordinator: {
        create: {
          employeeCode: 'GHT-CC-001',
          firstName: 'Sarah',
          lastName: 'Fernandes',
          assignedRegion: 'GCC & Middle East',
          languagesSpoken: ['English', 'Arabic', 'Hindi'],
          activeCaseCapacity: 30
        }
      }
    },
    include: { careCoordinator: true }
  });

  const reviewerUser = await prisma.user.create({
    data: {
      email: 'dr.anand.reviewer@gohealthtrip.com',
      phone: '+919820054321',
      passwordHash,
      role: UserRoleType.MEDICAL_REVIEWER,
      status: UserStatus.ACTIVE
    }
  });

  const patientUser = await prisma.user.create({
    data: {
      email: 'patient.ali.oman@demo.com',
      phone: '+96891234567',
      passwordHash,
      role: UserRoleType.PATIENT,
      status: UserStatus.ACTIVE,
      patient: {
        create: {
          firstName: 'Ali',
          lastName: 'Al-Balushi',
          dateOfBirth: new Date('1972-06-15'),
          gender: Gender.MALE,
          nationalityCountryId: countryOman.id,
          residenceCountryId: countryOman.id,
          primaryLanguageId: langAr.id,
          emergencyContactName: 'Fatima Al-Balushi',
          emergencyContactPhone: '+96891234568',
          emergencyContactRel: 'Spouse',
          medicalAllergies: 'Penicillin',
          chronicConditions: 'Type 2 Diabetes, Hypertension'
        }
      }
    },
    include: { patient: true }
  });

  console.log('👤 Seeded Core Users and Profiles');

  // 5. DEMO HOSPITALS (India Accredited)
  const apolloDelhi = await prisma.hospital.create({
    data: {
      name: 'Indraprastha Apollo Hospitals [DEMO]',
      slug: 'apollo-hospitals-delhi-demo',
      countryId: countryIndia.id,
      city: 'New Delhi',
      state: 'Delhi NCR',
      address: 'Sarita Vihar, Delhi Mathura Road, New Delhi 110076',
      accreditations: ['JCI', 'NABH', 'NABL', 'ISO 9001'],
      totalBeds: 710,
      icuBeds: 150,
      internationalDeskEmail: 'ipd.delhi@apollohospitals-demo.com',
      internationalDeskPhone: '+91 11 2692 5858',
      ratingScore: 4.9,
      reviewCount: 1420,
      description: 'First hospital in India to be accredited by JCI. Renowned internationally for Cardiac Sciences, Organ Transplants, and Oncology.',
      specialtiesOffered: ['Cardiology', 'Oncology', 'Organ Transplant', 'Neurosurgery', 'Orthopedics', 'Robotic Surgery']
    }
  });

  const fortisGurugram = await prisma.hospital.create({
    data: {
      name: 'Fortis Memorial Research Institute (FMRI) [DEMO]',
      slug: 'fortis-memorial-gurugram-demo',
      countryId: countryIndia.id,
      city: 'Gurugram',
      state: 'Haryana (Delhi NCR)',
      address: 'Sector 44, Opposite HUDA City Centre Metro Station, Gurugram 122002',
      accreditations: ['JCI', 'NABH', 'NABL'],
      totalBeds: 1000,
      icuBeds: 220,
      internationalDeskEmail: 'international@fortis-demo.com',
      internationalDeskPhone: '+91 124 496 2200',
      ratingScore: 4.8,
      reviewCount: 980,
      description: 'Flagship quaternary care hospital with international lounge, multi-lingual interpreters, and cutting-edge radiation oncology (CyberKnife, Gamma Knife).',
      specialtiesOffered: ['Bone Marrow Transplant', 'Neurosurgery', 'Pediatric Cardiac Surgery', 'Oncology', 'Orthopedics']
    }
  });

  const maxSaket = await prisma.hospital.create({
    data: {
      name: 'Max Super Speciality Hospital, Saket [DEMO]',
      slug: 'max-saket-delhi-demo',
      countryId: countryIndia.id,
      city: 'New Delhi',
      state: 'Delhi NCR',
      address: '1, 2, Press Enclave Marg, Saket Institutional Area, New Delhi 110017',
      accreditations: ['JCI', 'NABH', 'NABL'],
      totalBeds: 530,
      icuBeds: 130,
      internationalDeskEmail: 'int.desk@maxhealthcare-demo.com',
      internationalDeskPhone: '+91 11 2651 5050',
      ratingScore: 4.85,
      reviewCount: 1120,
      description: 'Center of excellence for Heart & Vascular Institute, Cancer Care, Neurosciences, and Orthopedics.',
      specialtiesOffered: ['Cardiology', 'Cancer Care', 'Orthopedics & Joint Replacement', 'Neurosciences', 'Kidney & Liver Transplant']
    }
  });

  const medantaGurugram = await prisma.hospital.create({
    data: {
      name: 'Medanta - The Medicity [DEMO]',
      slug: 'medanta-the-medicity-demo',
      countryId: countryIndia.id,
      city: 'Gurugram',
      state: 'Haryana (Delhi NCR)',
      address: 'CH Bakhtawar Singh Road, Sector 38, Gurugram 122001',
      accreditations: ['JCI', 'NABH', 'NABL'],
      totalBeds: 1250,
      icuBeds: 300,
      internationalDeskEmail: 'ipd@medanta-demo.org',
      internationalDeskPhone: '+91 124 414 1414',
      ratingScore: 4.9,
      reviewCount: 1850,
      description: 'One of India’s largest multi-super specialty institutes founded by world-renowned cardiac surgeon Dr. Naresh Trehan.',
      specialtiesOffered: ['Cardiothoracic Surgery', 'Liver Transplant', 'Neurosciences', 'Orthopedics', 'Urology & Kidney Transplant']
    }
  });

  console.log('🏥 Seeded Accredited Indian Hospitals');

  // 6. HOSPITAL DEPARTMENTS & SPECIALIST DOCTORS
  const apolloCardioDept = await prisma.hospitalDepartment.create({
    data: {
      hospitalId: apolloDelhi.id,
      name: 'Department of Cardiology & Cardiothoracic Surgery',
      headDoctor: 'Dr. Vivek Gupta',
      description: 'Comprehensive tertiary cardiac care center performing over 2,000 open heart surgeries annually.'
    }
  });

  const medantaCardioDept = await prisma.hospitalDepartment.create({
    data: {
      hospitalId: medantaGurugram.id,
      name: 'Heart Institute',
      headDoctor: 'Dr. Naresh Trehan',
      description: 'Pioneering minimally invasive bypass and robotic cardiac surgery in Asia.'
    }
  });

  const fortisOncoDept = await prisma.hospitalDepartment.create({
    data: {
      hospitalId: fortisGurugram.id,
      name: 'Department of Medical & Surgical Oncology',
      headDoctor: 'Dr. Vinod Raina',
      description: 'State-of-the-art cancer institute with advanced bone marrow transplant unit.'
    }
  });

  // DOCTORS
  const drTrehan = await prisma.doctor.create({
    data: {
      firstName: 'Naresh',
      lastName: 'Trehan [DEMO]',
      title: 'Dr.',
      primarySpecialty: 'Cardiothoracic Surgery',
      subSpecialties: ['Minimally Invasive CABG', 'Aortic Aneurysm Repair', 'Heart Transplant'],
      qualifications: 'MBBS, Diplomat American Board of Cardiothoracic Surgery',
      experienceYears: 42,
      languagesSpoken: ['English', 'Hindi', 'Punjabi'],
      bio: 'World-renowned cardiovascular and cardiothoracic surgeon with over 48,000 successful open heart surgeries.',
      internationalOpdRate: 150
    }
  });

  const drRaina = await prisma.doctor.create({
    data: {
      firstName: 'Vinod',
      lastName: 'Raina [DEMO]',
      title: 'Dr.',
      primarySpecialty: 'Medical Oncology & Hematology',
      subSpecialties: ['Bone Marrow Transplant', 'Lymphoma', 'Breast Cancer'],
      qualifications: 'MBBS, MD (Medicine), MRCP (UK), FRCP (Edinburgh)',
      experienceYears: 36,
      languagesSpoken: ['English', 'Hindi'],
      bio: 'One of India’s foremost medical oncologists, performing over 400 bone marrow transplants with world-class survival rates.',
      internationalOpdRate: 120
    }
  });

  const drSethi = await prisma.doctor.create({
    data: {
      firstName: 'Arun',
      lastName: 'Sethi [DEMO]',
      title: 'Dr.',
      primarySpecialty: 'Orthopedics & Joint Replacement',
      subSpecialties: ['Robotic Knee Replacement', 'Hip Resurfacing', 'Complex Trauma'],
      qualifications: 'MBBS, MS (Orthopedics), MCh Ortho (UK), FRCS',
      experienceYears: 28,
      languagesSpoken: ['English', 'Arabic (Conversational)', 'Hindi'],
      bio: 'Senior robotic joint replacement specialist with high international patient satisfaction.',
      internationalOpdRate: 100
    }
  });

  // Map Doctors to Hospitals
  await prisma.hospitalDoctor.create({
    data: {
      hospitalId: medantaGurugram.id,
      doctorId: drTrehan.id,
      departmentId: medantaCardioDept.id,
      designation: 'Chairman & Chief Cardiac Surgeon',
      consultationFee: 150,
      isPrimary: true
    }
  });

  await prisma.hospitalDoctor.create({
    data: {
      hospitalId: fortisGurugram.id,
      doctorId: drRaina.id,
      departmentId: fortisOncoDept.id,
      designation: 'Executive Director & Head of Oncology',
      consultationFee: 120,
      isPrimary: true
    }
  });

  await prisma.hospitalDoctor.create({
    data: {
      hospitalId: apolloDelhi.id,
      doctorId: drSethi.id,
      departmentId: apolloCardioDept.id, // Using existing dept ref for demo
      designation: 'Senior Consultant Joint Replacement',
      consultationFee: 100,
      isPrimary: true
    }
  });

  console.log('👨‍⚕️ Seeded Specialists & Hospital Doctor Mappings');

  // 7. TREATMENTS, PROCEDURES & PACKAGES
  const cabgTreatment = await prisma.treatment.create({
    data: {
      code: 'CARD-CABG-01',
      name: 'Coronary Artery Bypass Grafting (CABG)',
      category: 'Cardiology',
      description: 'Open heart or minimally invasive bypass surgery using arterial or venous grafts to restore blood supply to ischemic myocardium.',
      typicalStayDays: 7,
      typicalRecoveryDays: 14,
      indicativePriceMinUsd: 5200,
      indicativePriceMaxUsd: 7800,
      procedures: {
        create: [
          { name: 'Median Sternotomy / Off-pump Bypass', durationHours: 4.5, anesthesiaType: 'General' },
          { name: 'Pre-operative Coronary Angiogram', durationHours: 1.0, anesthesiaType: 'Local' }
        ]
      },
      packages: {
        create: {
          packageName: 'Complete CABG Package (Deluxe Room + Attendant Stay)',
          packagePriceUsd: 6500,
          inclusions: ['Pre-op investigations', '7 days hospital stay (2 ICU + 5 Deluxe Room)', 'Surgeon & Anesthetist fees', 'Standard medications & consumables', 'Airport pickup & drop'],
          exclusions: ['Extra stay beyond 7 days', 'Treatment for unforeseen co-morbidities', 'High-cost blood products if required'],
          hospitalStayDays: 7,
          icuStayDays: 2,
          hotelStayDays: 7,
          airportTransfers: true
        }
      }
    }
  });

  const kneeReplacement = await prisma.treatment.create({
    data: {
      code: 'ORTHO-TKR-01',
      name: 'Bilateral Robotic Total Knee Replacement',
      category: 'Orthopedics',
      description: 'Computer-navigated robotic joint replacement using FDA-approved high-flexion titanium/cobalt-chrome implants.',
      typicalStayDays: 5,
      typicalRecoveryDays: 10,
      indicativePriceMinUsd: 6000,
      indicativePriceMaxUsd: 8500,
      procedures: {
        create: [
          { name: 'Robotic-assisted Total Knee Arthroplasty (Bilateral)', durationHours: 3.5, anesthesiaType: 'Spinal / Epidural' }
        ]
      },
      packages: {
        create: {
          packageName: 'Bilateral Robotic Knee Replacement with FDA Implants',
          packagePriceUsd: 7200,
          inclusions: ['Both knee implants (Stryker/Zimmer)', '5 days hospital room', 'Physiotherapy sessions', 'Airport transfer'],
          exclusions: ['Specialized rehabilitation hotel stay', 'Custom knee braces'],
          hospitalStayDays: 5,
          icuStayDays: 0,
          hotelStayDays: 10,
          airportTransfers: true
        }
      }
    }
  });

  const bmtTreatment = await prisma.treatment.create({
    data: {
      code: 'ONCO-BMT-01',
      name: 'Allogeneic Bone Marrow Transplant (BMT)',
      category: 'Oncology',
      description: 'High-dose conditioning chemotherapy followed by matched sibling/unrelated donor hematopoietic stem cell infusion in positive-pressure HEPA room.',
      typicalStayDays: 28,
      typicalRecoveryDays: 60,
      indicativePriceMinUsd: 22000,
      indicativePriceMaxUsd: 32000,
      procedures: {
        create: [
          { name: 'Stem Cell Harvesting & Conditioning', durationHours: 6.0, anesthesiaType: 'None' },
          { name: 'Donor Stem Cell Infusion', durationHours: 2.0, anesthesiaType: 'None' }
        ]
      },
      packages: {
        create: {
          packageName: 'Matched Sibling Allogeneic BMT in Isolated HEPA Unit',
          packagePriceUsd: 26000,
          inclusions: ['Pre-BMT HLA typing & donor workup', 'Conditioning chemotherapy', '28 days HEPA room isolation', 'Stem cell mobilization & processing'],
          exclusions: ['GVHD targeted therapy if severe', 'ICU ventilator care if complications arise'],
          hospitalStayDays: 28,
          icuStayDays: 5,
          hotelStayDays: 30,
          airportTransfers: true
        }
      }
    }
  });

  console.log('💊 Seeded Medical Procedures & Treatment Packages');

  // 8. PARTNER HOTELS & TRANSPORT FLEET (DEMO)
  const hotelDelhi = await prisma.hotel.create({
    data: {
      name: 'The Suryaa New Delhi [Partner Hotel DEMO]',
      city: 'New Delhi',
      address: 'New Friends Colony, New Delhi 110025 (4 km from Apollo Hospital)',
      distanceToHospitalKm: 4.2,
      starRating: 5,
      isWheelchairAccessible: true,
      hasKitchenette: true,
      contactPhone: '+91 11 2683 5070'
    }
  });

  const hotelGurugram = await prisma.hotel.create({
    data: {
      name: 'Courtyard by Marriott Gurugram Downtown [DEMO]',
      city: 'Gurugram',
      address: 'Plot no 27 B, Sector Road, B Block, Sushant Lok Phase I, Gurugram 122002',
      distanceToHospitalKm: 1.8,
      starRating: 4,
      isWheelchairAccessible: true,
      hasKitchenette: false,
      contactPhone: '+91 124 488 8444'
    }
  });

  const transportFleet = await prisma.transportProvider.create({
    data: {
      companyName: 'GoHealthTrip Dedicated Patient Mobility Fleet [DEMO]',
      city: 'Delhi NCR',
      contactPhone: '+91 98111 88888',
      fleetTypes: ['Standard AC Sedan', 'Wheelchair Van', 'ICU Ambulance', '7-Seater Attendant Van']
    }
  });

  console.log('🏨 Seeded Partner Hotels & Transport Fleet');

  // 9. COMPLETE DEMO MEDICAL CASE (Ali Al-Balushi - CABG Journey)
  const demoCase = await prisma.medicalCase.create({
    data: {
      caseNumber: 'GHT-2026-OMN-0101',
      patientId: patientUser.patient!.id,
      assignedCoordinatorId: coordinatorUser.careCoordinator!.id,
      assignedMedicalReviewerId: drTrehan.id,
      currentStage: MedicalCaseStage.PROPOSAL_READY,
      priority: CasePriority.HIGH,
      primaryCondition: 'Triple Vessel Coronary Artery Disease with Angina',
      symptomsDescription: 'Exertional dyspnea and retrosternal chest discomfort for 4 months. Angiography in Muscat showed 90% LAD and 85% RCA stenosis.',
      requestedTreatment: 'Coronary Artery Bypass Grafting (CABG)',
      preferredHospitalLocation: 'Delhi NCR',
      budgetMinUsd: 5000,
      budgetMaxUsd: 8000,
      targetTravelDate: new Date('2026-10-15'),
      medicalConditions: {
        create: [
          { name: 'Triple Vessel CAD', icd10Code: 'I25.10', isPrimary: true },
          { name: 'Type 2 Diabetes Mellitus', icd10Code: 'E11.9', isPrimary: false }
        ]
      },
      medicalDocuments: {
        create: [
          {
            patientId: patientUser.patient!.id,
            category: DocumentCategory.DIAGNOSTIC_REPORT,
            originalFilename: 'Coronary_Angiography_Muscat_Aug2026.pdf',
            mimeType: 'application/pdf',
            fileSizeBytes: BigInt(2450120),
            storageKey: 'cases/GHT-2026-OMN-0101/angiography_report.pdf',
            virusScanStatus: VirusScanStatus.CLEAN,
            documentStatus: DocumentStatus.READY,
            aiExtractionDone: true,
            aiExtractionJson: {
              diagnosis_extracted: 'Triple Vessel Coronary Artery Disease (CAD)',
              findings: '90% stenosis in mid-LAD, 85% stenosis in proximal RCA, 70% in LCx.',
              left_ventricular_ejection_fraction: '52%',
              doctor_notes_found: 'Recommended for surgical revascularization (CABG).',
              missing_documents: ['Recent Serum Creatinine & Kidney Function', 'Echocardiogram 2D Report']
            }
          },
          {
            patientId: patientUser.patient!.id,
            category: DocumentCategory.PASSPORT_COPY,
            originalFilename: 'Patient_Passport_Ali_AlBalushi.pdf',
            mimeType: 'application/pdf',
            fileSizeBytes: BigInt(1240500),
            storageKey: 'cases/GHT-2026-OMN-0101/passport_ali.pdf',
            virusScanStatus: VirusScanStatus.CLEAN,
            documentStatus: DocumentStatus.READY
          }
        ]
      },
      clinicalReviews: {
        create: {
          reviewerDoctorId: drTrehan.id,
          clinicalSummary: '54-year-old male with symptomatic Triple Vessel CAD and preserved LVEF (52%). Ideal candidate for Off-Pump CABG (3 to 4 grafts). Low surgical risk score.',
          extractedDiagnosis: 'Severe Triple Vessel Coronary Disease with Stable Angina',
          recommendedSpecialties: ['Cardiothoracic Surgery', 'Cardiology'],
          recommendedProcedures: ['Off-Pump Coronary Artery Bypass Graft (OPCABG)'],
          missingRecords: ['2D Echo Scan Report', 'Current HbA1c and Renal Profile'],
          riskFlags: ['Diabetic (requires peri-operative glycemic control)'],
          reviewStatus: 'APPROVED'
        }
      }
    }
  });

  // Companion
  await prisma.patientCompanion.create({
    data: {
      patientId: patientUser.patient!.id,
      firstName: 'Fatima',
      lastName: 'Al-Balushi',
      relationship: 'SPOUSE',
      passportNumberEncrypted: 'AES_ENC_PASSPORT_FATIMA_DEMO',
      nationalityCountryId: countryOman.id,
      requiresAttendantVisa: true,
      isTravelling: true
    }
  });

  // Estimate & Treatment Proposal
  const demoEstimate = await prisma.treatmentEstimate.create({
    data: {
      caseId: demoCase.id,
      hospitalId: medantaGurugram.id,
      doctorId: drTrehan.id,
      estimateType: EstimateType.HOSPITAL_QUOTATION,
      procedureCostUsd: 4800,
      doctorFeeUsd: 1200,
      roomAndNursingUsd: 600,
      diagnosticsCostUsd: 300,
      additionalEstUsd: 200,
      totalEstimateUsd: 7100,
      currency: 'USD',
      inclusions: [
        'Pre-operative investigations & blood work',
        'Off-pump Coronary Artery Bypass Surgery by Dr. Naresh Trehan',
        '2 Days in Post-Op Cardiac ICU + 5 Days in Private Deluxe Room',
        'Post-operative rehabilitation & dietitian consultation',
        'Airport reception in dedicated AC Vehicle'
      ],
      exclusions: [
        'Treatment of unassociated pre-existing complications',
        'Specialty medicines not part of standard CABG clinical pathway',
        'Extended room stay beyond 7 days'
      ],
      assumptions: [
        'Patient presents in hemodynamically stable condition without acute coronary syndrome during transit',
        'No emergency renal dialysis required'
      ],
      validUntil: new Date('2026-11-30'),
      version: 1,
      status: EstimateStatus.APPROVED
    }
  });

  await prisma.treatmentProposal.create({
    data: {
      caseId: demoCase.id,
      version: 1,
      hospitalId: medantaGurugram.id,
      doctorId: drTrehan.id,
      treatmentEstimateId: demoEstimate.id,
      treatmentCostUsd: 7100,
      logisticsCostUsd: 950,
      platformFeeUsd: 250,
      totalAmountUsd: 8300,
      estimatedAdmissionDate: new Date('2026-10-18'),
      estimatedHospitalDays: 7,
      estimatedRecoveryDays: 7,
      termsAndConditions: 'Package price valid for 60 days. Includes complete care coordinator guidance, hospital concierge, airport transfer, and 1 remote post-treatment tele-consultation upon return to Oman.',
      validUntil: new Date('2026-11-30'),
      status: ProposalStatus.SENT_TO_PATIENT
    }
  });

  // Visa Case
  await prisma.visaCase.create({
    data: {
      caseId: demoCase.id,
      visaType: VisaType.INDIAN_E_MEDICAL_VISA,
      status: VisaStatus.VIL_GENERATED,
      invitationLetterStorageKey: 'cases/GHT-2026-OMN-0101/visa/Medanta_VIL_Ali_AlBalushi.pdf',
      frroRegistrationRequired: false
    }
  });

  // Travel Plan Draft
  const travelPlan = await prisma.travelPlan.create({
    data: {
      caseId: demoCase.id,
      status: TravelPlanStatus.PLANNED,
      arrivalDate: new Date('2026-10-16'),
      departureDate: new Date('2026-10-31'),
      specialAssistanceReq: 'Airport wheelchair assistance required on arrival.'
    }
  });

  await prisma.hotelBooking.create({
    data: {
      travelPlanId: travelPlan.id,
      hotelId: hotelGurugram.id,
      checkInDate: new Date('2026-10-16'),
      checkOutDate: new Date('2026-10-18'),
      roomType: 'Deluxe Twin Suite (Patient + Attendant)',
      numberOfGuests: 2,
      bookingReference: 'HTL-GUR-2026-892',
      totalCostUsd: 240,
      status: BookingStatus.CONFIRMED
    }
  });

  await prisma.transportBooking.create({
    data: {
      travelPlanId: travelPlan.id,
      transportProviderId: transportFleet.id,
      transportType: TransportType.AIRPORT_PICKUP_STANDARD,
      pickupLocation: 'Indira Gandhi International Airport (DEL) Terminal 3',
      dropoffLocation: 'Courtyard by Marriott, Gurugram',
      scheduledTime: new Date('2026-10-16T14:30:00Z'),
      driverName: 'Rajesh Kumar [DEMO]',
      driverPhone: '+91 98765 43210',
      vehicleNumber: 'DL 1Z A 4488',
      status: BookingStatus.CONFIRMED
    }
  });

  // Initial Consents
  await prisma.consent.create({
    data: {
      userId: patientUser.id,
      caseId: demoCase.id,
      consentType: ConsentType.TERMS_OF_SERVICE,
      documentVersion: 'v1.0',
      ipAddress: '82.178.44.12',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  });

  await prisma.consent.create({
    data: {
      userId: patientUser.id,
      caseId: demoCase.id,
      consentType: ConsentType.PRIVACY_POLICY_DPDP,
      documentVersion: 'v1.0',
      ipAddress: '82.178.44.12',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  });

  // Audit Log
  await prisma.auditLog.create({
    data: {
      entityName: 'MedicalCase',
      entityId: demoCase.id,
      userId: coordinatorUser.id,
      action: AuditAction.STAGE_TRANSITION,
      oldValuesJson: { stage: 'PROVIDER_REVIEW' },
      newValuesJson: { stage: 'PROPOSAL_READY' },
      reason: 'Formal quotation and clinical proposal prepared by Care Coordinator for patient review.',
      ipAddress: '103.21.124.5'
    }
  });

  console.log('🎉 Seeded Complete Demo Case (GHT-2026-OMN-0101) with Proposals, Visa, Travel, and Audit Log!');
  console.log('✅ Database Seeding Completed Successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
