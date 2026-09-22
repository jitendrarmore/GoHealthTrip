// Hexagonal Port & Adapter Interfaces for External Services

import { IdentityVerificationStatus, PaymentStatus, VisaStatus } from '@prisma/client';

// 1. IDENTITY VERIFICATION PORT
export interface IdentityCheckRequest {
  patientId: string;
  documentType: 'PASSPORT' | 'NATIONAL_ID';
  documentNumber: string;
  countryCode: string;
  documentImageUrl?: string;
}

export interface IdentityCheckResponse {
  referenceId: string;
  status: IdentityVerificationStatus;
  confidenceScore: number;
  extractedDetails?: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    expiryDate?: string;
  };
  failureReason?: string;
}

export interface IIdentityVerificationProvider {
  initiateVerification(req: IdentityCheckRequest): Promise<IdentityCheckResponse>;
  checkStatus(referenceId: string): Promise<IdentityCheckResponse>;
}

export class MockIdentityVerificationProvider implements IIdentityVerificationProvider {
  async initiateVerification(req: IdentityCheckRequest): Promise<IdentityCheckResponse> {
    return {
      referenceId: `MOCK-IDV-${Date.now()}`,
      status: IdentityVerificationStatus.VERIFIED,
      confidenceScore: 0.98,
      extractedDetails: {
        firstName: 'DEMO',
        lastName: 'PATIENT',
        dateOfBirth: '1980-01-01',
        expiryDate: '2030-12-31',
      },
    };
  }

  async checkStatus(referenceId: string): Promise<IdentityCheckResponse> {
    return {
      referenceId,
      status: IdentityVerificationStatus.VERIFIED,
      confidenceScore: 0.98,
    };
  }
}

// 2. PAYMENT PROVIDER PORT
export interface PaymentIntentRequest {
  caseId: string;
  amount: number;
  currency: string;
  paymentCategory: string;
  customerEmail: string;
  customerName: string;
  idempotencyKey: string;
}

export interface PaymentIntentResponse {
  transactionReference: string;
  checkoutUrl: string;
  status: PaymentStatus;
}

export interface IPaymentProvider {
  createPaymentIntent(req: PaymentIntentRequest): Promise<PaymentIntentResponse>;
  verifyWebhookSignature(payload: any, signature: string): boolean;
  processRefund(transactionReference: string, amount: number, reason: string): Promise<{ refundId: string; success: boolean }>;
}

export class MockPaymentProvider implements IPaymentProvider {
  async createPaymentIntent(req: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    return {
      transactionReference: `MOCK-TXN-${Date.now()}`,
      checkoutUrl: `https://checkout.gohealthtrip.demo/pay/${req.caseId}?ref=MOCK-${Date.now()}`,
      status: PaymentStatus.INITIATED,
    };
  }

  verifyWebhookSignature(payload: any, signature: string): boolean {
    return true;
  }

  async processRefund(transactionReference: string, amount: number, reason: string) {
    return { refundId: `MOCK-REFUND-${Date.now()}`, success: true };
  }
}

// 3. HOSPITAL INTEGRATION PORT
export interface HospitalCaseSubmissionRequest {
  hospitalId: string;
  caseId: string;
  patientName: string;
  age: number;
  gender: string;
  clinicalSummary: string;
  medicalDocuments: Array<{ name: string; url: string }>;
}

export interface HospitalQuotationResponse {
  hospitalQuotationNumber: string;
  estimatedCostUsd: number;
  estimatedStayDays: number;
  recommendedSurgeon?: string;
  earliestAvailableDate?: string;
  inclusions: string[];
  exclusions: string[];
}

export interface IHospitalIntegrationProvider {
  submitCase(req: HospitalCaseSubmissionRequest): Promise<{ externalCaseId: string; status: string }>;
  getQuotation(externalCaseId: string): Promise<HospitalQuotationResponse | null>;
  confirmAdmission(caseId: string, admissionDate: Date): Promise<{ admissionId: string; roomNumber?: string }>;
}

export class MockHospitalAdapter implements IHospitalIntegrationProvider {
  async submitCase(req: HospitalCaseSubmissionRequest) {
    return { externalCaseId: `MOCK-HOSP-CASE-${Date.now()}`, status: 'RECEIVED_BY_INTERNATIONAL_DESK' };
  }

  async getQuotation(externalCaseId: string): Promise<HospitalQuotationResponse> {
    return {
      hospitalQuotationNumber: `HQ-${Date.now()}`,
      estimatedCostUsd: 7200,
      estimatedStayDays: 7,
      recommendedSurgeon: 'Dr. Naresh Trehan [DEMO]',
      earliestAvailableDate: '2026-10-18',
      inclusions: ['Surgery', '2 ICU days', '5 Private Room days', 'Surgeon fees'],
      exclusions: ['Extra stay', 'Non-standard medicines'],
    };
  }

  async confirmAdmission(caseId: string, admissionDate: Date) {
    return { admissionId: `IPD-${Date.now()}`, roomNumber: 'Suite 408' };
  }
}

// 4. AI MEDICAL DOCUMENT EXTRACTION PORT
export interface AIDocumentExtractionRequest {
  documentStorageKey: string;
  documentCategory: string;
  mimeType: string;
}

export interface AIDocumentExtractionResult {
  extractedDiagnosis: string[];
  proceduresMentioned: string[];
  medications: string[];
  labValues: Record<string, string>;
  imagingFindings: string[];
  doctorRecommendations: string[];
  missingDocuments: string[];
  confidenceScore: number;
  disclaimer: string;
}

export interface IAIProvider {
  extractDocumentData(req: AIDocumentExtractionRequest): Promise<AIDocumentExtractionResult>;
  generateCaseSummary(caseData: any): Promise<string>;
}

export class MockAIProvider implements IAIProvider {
  async extractDocumentData(req: AIDocumentExtractionRequest): Promise<AIDocumentExtractionResult> {
    return {
      extractedDiagnosis: ['Coronary Artery Disease (CAD)', 'Type 2 Diabetes Mellitus'],
      proceduresMentioned: ['Coronary Angiography', 'Bypass Grafting (CABG) Recommended'],
      medications: ['Aspirin 75mg', 'Atorvastatin 40mg', 'Metformin 500mg'],
      labValues: { 'LVEF': '52%', 'Serum Creatinine': '1.1 mg/dL', 'HbA1c': '7.2%' },
      imagingFindings: ['90% Stenosis LAD', '85% Stenosis RCA'],
      doctorRecommendations: ['Early surgical myocardial revascularization (CABG) advised'],
      missingDocuments: ['Recent Chest X-Ray (PA View)', 'Pre-operative Pulmonary Function Test'],
      confidenceScore: 0.94,
      disclaimer: 'AI-generated informational extraction for administrative facilitation only. Not a medical diagnosis.',
    };
  }

  async generateCaseSummary(caseData: any): Promise<string> {
    return `Patient presenting with symptomatic CAD. Reports indicate 90% LAD stenosis with preserved left ventricular function (52%). Suitable for clinical evaluation and hospital quotation for CABG in India.`;
  }
}

// 5. NOTIFICATION PROVIDER PORT
export interface NotificationPayload {
  userId: string;
  channel: 'IN_APP' | 'SMS' | 'WHATSAPP' | 'EMAIL';
  recipient: string;
  subject?: string;
  body: string;
}

export interface INotificationProvider {
  send(payload: NotificationPayload): Promise<{ success: boolean; messageId: string }>;
}

export class MockNotificationProvider implements INotificationProvider {
  async send(payload: NotificationPayload) {
    return { success: true, messageId: `MOCK-NOTIF-${Date.now()}` };
  }
}

// 6. VISA PROVIDER PORT
export interface IVisaProvider {
  generateInvitationLetterDossier(caseId: string): Promise<{ dossierUrl: string; trackingNumber: string }>;
  checkVisaStatus(embassyApplicationId: string): Promise<{ status: VisaStatus }>;
}

export class MockVisaProvider implements IVisaProvider {
  async generateInvitationLetterDossier(caseId: string) {
    return {
      dossierUrl: `https://storage.gohealthtrip.demo/vil/case-${caseId}.pdf`,
      trackingNumber: `VIL-IND-2026-${Date.now()}`,
    };
  }

  async checkVisaStatus(embassyApplicationId: string) {
    return { status: VisaStatus.APPROVED };
  }
}

// 7. HOTEL & TRANSPORT PROVIDERS
export class MockHotelProvider {
  async searchHotelsNearHospital(hospitalId: string, checkIn: Date, checkOut: Date) {
    return [
      { hotelName: 'The Suryaa New Delhi [DEMO]', rating: 5, pricePerNightUsd: 65, distanceKm: 4.2 },
      { hotelName: 'Courtyard by Marriott Gurugram [DEMO]', rating: 4, pricePerNightUsd: 55, distanceKm: 1.8 },
    ];
  }
}

export class MockTransportProvider {
  async dispatchAirportTransfer(pickupTime: Date, terminal: string, dropoff: string) {
    return {
      bookingId: `TRN-${Date.now()}`,
      driverName: 'Rajesh Kumar [DEMO]',
      driverPhone: '+91 98765 43210',
      vehicle: 'DL 1Z A 4488 (Dedicated Sanitized AC Sedan)',
    };
  }
}
