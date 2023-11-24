import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Grupo 3 Jr',
      version: '1.3.0',
      description: 'User management API',
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
              }
    },
    servers:[
      {
      url:'http://localhost:3000'
      }
    ]
  },
  apis: [
    'app.js',
    './src/api/users/routes/*.js',
    `${path.join('./src/api/users/routes/*.js')}`
   ],
};

export const openApiSpecification = swaggerJSDoc(swaggerOptions);