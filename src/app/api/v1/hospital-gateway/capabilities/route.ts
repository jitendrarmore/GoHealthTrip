import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/api/response';
import { HospitalGatewayService } from '@/lib/hospital-gateway/hospital-gateway-service';

export async function GET() {
  const capabilities = HospitalGatewayService.getCapabilities();
  return apiSuccess(capabilities, 200, {
    totalPartners: capabilities.length,
    protocolsSupported: ['FHIR_R4', 'REST_API', 'SECURE_PORTAL_MANUAL'],
  });
}
