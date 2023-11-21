import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grupo 3 Jr',
      version: '1.0.0',
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