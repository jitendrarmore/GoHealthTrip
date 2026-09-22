import { NextResponse } from 'next/server';

export async function GET() {
  const openApiSpec = {
    openapi: '3.0.3',
    info: {
      title: 'GoHealthTrip Platform API',
      version: '1.0.0',
      description: 'Production-grade International Medical Tourism Platform API (Headquartered in India). Facilitates patient journeys, clinical reviews, provider matching, proposals, visa processing, and travel logistics.',
      contact: {
        name: 'GoHealthTrip Engineering Team',
        email: 'engineering@gohealthtrip.com',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Current Environment API Base URL',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token obtained from /auth/login',
        },
      },
      schemas: {
        MedicalCaseStage: {
          type: 'string',
          enum: [
            'LEAD', 'REGISTERED', 'IDENTITY_PENDING', 'IDENTITY_VERIFIED',
            'MEDICAL_DOCUMENTS_PENDING', 'MEDICAL_REVIEW', 'ADDITIONAL_INFORMATION_REQUIRED',
            'READY_FOR_PROVIDER_MATCHING', 'PROVIDER_REVIEW', 'PROPOSAL_READY',
            'PATIENT_DECISION', 'PAYMENT_PENDING', 'ACCEPTED', 'DECLINED',
            'VISA_PROCESSING', 'VISA_APPROVED', 'TRAVEL_PLANNING', 'READY_FOR_TRAVEL',
            'ARRIVED_IN_INDIA', 'HOSPITAL_ADMISSION', 'TREATMENT_IN_PROGRESS',
            'DISCHARGE', 'RECOVERY', 'RETURN_HOME', 'FOLLOW_UP', 'COMPLETED', 'CANCELLED'
          ],
        },
        ErrorEnvelope: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string', example: 'INVALID_TRANSITION' },
                message: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
    paths: {
      '/auth/login': {
        post: {
          summary: 'Authenticate user & issue JWT',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Authenticated successfully' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/cases': {
        get: {
          summary: 'List medical cases with role-scoped filtering and pagination',
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: 'stage', in: 'query', schema: { $ref: '#/components/schemas/MedicalCaseStage' } },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          ],
          responses: {
            200: { description: 'Paginated list of medical cases' },
          },
        },
        post: {
          summary: 'Create a new medical case inquiry',
          security: [{ BearerAuth: [] }],
          responses: {
            201: { description: 'Medical case initialized' },
          },
        },
      },
      '/cases/{id}/stage': {
        patch: {
          summary: 'Execute a deterministic state machine transition',
          security: [{ BearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['targetStage'],
                  properties: {
                    targetStage: { $ref: '#/components/schemas/MedicalCaseStage' },
                    reason: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Stage transitioned successfully' },
            422: { description: 'Guard or transition violation' },
          },
        },
      },
      '/matching': {
        post: {
          summary: 'Execute structured provider matching algorithm',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['specialty'],
                  properties: {
                    specialty: { type: 'string' },
                    preferredCity: { type: 'string' },
                    maxBudgetUsd: { type: 'number' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Compatible hospital and doctor matches returned' },
          },
        },
      },
    },
  };

  return NextResponse.json(openApiSpec);
}
