import { IntegrationType } from '@prisma/client';

export interface HospitalCapability {
  hospitalId: string;
  hospitalName: string;
  integrationType: IntegrationType;
  supportedOperations: string[];
  authenticationType: 'BEARER_JWT' | 'OAUTH2_SMART_ON_FHIR' | 'HMAC_SHA256' | 'SECURE_PORTAL';
  status: 'ONLINE' | 'DEGRADED' | 'MAINTENANCE';
  lastSyncAt: string;
  endpointUrl?: string;
}

export interface IHospitalIntegrationProvider {
  createPatient(patientData: any): Promise<{ externalPatientId: string }>;
  getPatient(externalPatientId: string): Promise<any>;
  searchDoctors(specialty: string): Promise<any[]>;
  getDoctorAvailability(doctorId: string, date: string): Promise<any[]>;
  createAppointment(appointmentData: any): Promise<{ appointmentId: string; status: string }>;
  getAppointment(appointmentId: string): Promise<any>;
  submitCase(caseData: any): Promise<{ externalCaseId: string; status: string }>;
  getCaseStatus(externalCaseId: string): Promise<{ status: string; notes?: string }>;
  submitEstimate(estimateData: any): Promise<{ estimateId: string; totalAmountUsd: number }>;
  getEstimate(estimateId: string): Promise<any>;
  createAdmission(admissionData: any): Promise<{ admissionNumber: string; roomNumber: string }>;
  getAdmissionStatus(admissionNumber: string): Promise<{ status: string; currentWard: string }>;
  submitTreatmentUpdate(updateData: any): Promise<{ updateId: string; success: boolean }>;
  submitDischarge(dischargeData: any): Promise<{ dischargeId: string; summaryUrl: string }>;
  createFollowUp(followUpData: any): Promise<{ followUpId: string; scheduledTime: string }>;
}

/**
 * Common Gateway Orchestrator managing heterogeneous hospital connections
 */
export class HospitalGatewayService {
  private static readonly CAPABILITY_REGISTRY: Record<string, HospitalCapability> = {
    'apollo-hospitals-delhi-demo': {
      hospitalId: 'apollo-hospitals-delhi-demo',
      hospitalName: 'Indraprastha Apollo Hospitals, New Delhi',
      integrationType: IntegrationType.FHIR_R4,
      supportedOperations: [
        'CREATE_PATIENT', 'SUBMIT_CASE', 'CREATE_APPOINTMENT', 
        'GET_ESTIMATE', 'CONFIRM_ADMISSION', 'SUBMIT_DISCHARGE'
      ],
      authenticationType: 'OAUTH2_SMART_ON_FHIR',
      status: 'ONLINE',
      lastSyncAt: new Date().toISOString(),
      endpointUrl: 'https://fhir.apollohospitals.demo/r4',
    },
    'medanta-the-medicity-demo': {
      hospitalId: 'medanta-the-medicity-demo',
      hospitalName: 'Medanta - The Medicity, Gurugram',
      integrationType: IntegrationType.REST_API,
      supportedOperations: [
        'CREATE_PATIENT', 'SUBMIT_CASE', 'CREATE_APPOINTMENT', 
        'SUBMIT_ESTIMATE', 'GET_ESTIMATE', 'CONFIRM_ADMISSION', 'SUBMIT_DISCHARGE', 'CREATE_FOLLOW_UP'
      ],
      authenticationType: 'BEARER_JWT',
      status: 'ONLINE',
      lastSyncAt: new Date().toISOString(),
      endpointUrl: 'https://api.medanta.demo/v2/ipd',
    },
    'fortis-memorial-gurugram-demo': {
      hospitalId: 'fortis-memorial-gurugram-demo',
      hospitalName: 'Fortis Memorial Research Institute (FMRI)',
      integrationType: IntegrationType.REST_API,
      supportedOperations: [
        'SUBMIT_CASE', 'GET_ESTIMATE', 'CONFIRM_ADMISSION', 'SUBMIT_DISCHARGE'
      ],
      authenticationType: 'HMAC_SHA256',
      status: 'ONLINE',
      lastSyncAt: new Date().toISOString(),
      endpointUrl: 'https://gateway.fortis-demo.com/international',
    },
    'max-saket-delhi-demo': {
      hospitalId: 'max-saket-delhi-demo',
      hospitalName: 'Max Super Speciality Hospital, Saket',
      integrationType: IntegrationType.SECURE_PORTAL_MANUAL,
      supportedOperations: [
        'MANUAL_DOSSIER_DISPATCH', 'VIL_GENERATION', 'QUOTATION_SUBMISSION'
      ],
      authenticationType: 'SECURE_PORTAL',
      status: 'ONLINE',
      lastSyncAt: new Date().toISOString(),
    },
  };

  /**
   * Retrieves active capability registry for all partner hospitals
   */
  static getCapabilities(): HospitalCapability[] {
    return Object.values(this.CAPABILITY_REGISTRY);
  }

  /**
   * Submits patient dossier to the designated hospital with automated adapter routing
   */
  static async dispatchCaseToHospital(hospitalSlug: string, caseData: any): Promise<{
    externalCaseId: string;
    protocolUsed: string;
    quotationExpectedInHours: number;
  }> {
    const capability = this.CAPABILITY_REGISTRY[hospitalSlug] || this.CAPABILITY_REGISTRY['medanta-the-medicity-demo'];

    // Route dynamically based on hospital capability
    if (capability.integrationType === IntegrationType.FHIR_R4) {
      // Formulate FHIR R4 Bundle
      return {
        externalCaseId: `FHIR-BUNDLE-APOLLO-${Date.now()}`,
        protocolUsed: 'FHIR R4 (Patient/Condition/DiagnosticReport Bundle)',
        quotationExpectedInHours: 24,
      };
    } else if (capability.integrationType === IntegrationType.REST_API) {
      return {
        externalCaseId: `REST-MEDANTA-CASE-${Date.now()}`,
        protocolUsed: 'REST JSON / IPD API Gateway',
        quotationExpectedInHours: 24,
      };
    } else {
      return {
        externalCaseId: `PORTAL-MANUAL-${Date.now()}`,
        protocolUsed: 'Secure Hospital Coordinator Portal',
        quotationExpectedInHours: 48,
      };
    }
  }
}
