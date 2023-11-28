
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerSpect = {
    definition:{
        openapi:'3.0.1',
        info:{
            title: ' grupo jr  3',
            version: '1.3.0',
            description: 'User management API',
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
              }
        },
        servers:[
            {
                url:'http://localhost:5000'
            }
        ]
    },
    apis:[
        `${path.join('./routes/*.js')}`,
    ]


}
export const openApiSpecification = swaggerJsDoc(swaggerSpect);

