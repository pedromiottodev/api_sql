import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Teste Técnico – API REST + SQL Básico',
      version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:3333' }],
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Erro' }
          },
          required: ['message']
        },
        OkResponse: {
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: true }
          },
          required: ['ok']
        },
        IdParam: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-ou-id' }
          },
          required: ['id']
        },

        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '50fbb748-0414-4c6d-9d1b-61a4368c60fc' },
            name: { type: 'string', example: 'Pedro Miotto' }
          },
          required: ['id', 'name']
        },

        Course: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'f9cecbe1-d5be-4efe-8227-4cb605e95094' },
            name: { type: 'string', example: 'Curso de JavaScript' }
          },
          required: ['id', 'name']
        },

        Progress: {
          type: 'object',
          properties: {
            user_id: { type: 'string', example: '8b74af07-b9c2-413b-968e-1726d099dcdf' },
            course_id: { type: 'string', example: '96675613-9e52-41fa-b50a-4fba3058fb44' },
            percentual: { type: 'integer', example: 98 },
            created_at: { type: 'string', format: 'date-time', example: '2026-02-05T10:28:40.813Z' }
          },
          required: ['user_id', 'course_id', 'percentual', 'created_at']
        },

        Registration: {
          type: 'object',
          properties: {
            user_id: { type: 'string', example: '8b74af07-b9c2-413b-968e-1726d099dcdf' },
            course_id: { type: 'string', example: 'f9cecbe1-d5be-4efe-8227-4cb605e95094' },
            created_at: { type: 'string', format: 'date-time', example: '2026-02-05T10:29:23.853Z' }
          },
          required: ['user_id', 'course_id', 'created_at']
        }
      }
    }
  },
  apis: ['src/routes/**/*.ts', 'src/**/*.routes.ts']
})
