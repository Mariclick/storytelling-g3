import express from 'express';

import { port } from './config/index.js';
import dbConnection from './config/db.js';
import userRoutes from  './routes/user.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import responseOpenApiAI from './config/openai2.js'

const swaggerSpect ={
    definition: {
        openapi: '3.1.0',
        info: {
          title: 'grupo 3 js',
          version: '1.0.1',
        },
        servers:[
          {
          url:'http://localhost:3000'
          }
        ],
      },
      apis: [
        `${path.join('./routes/*.js')}`

       ], 
    
}
export { swaggerJSDoc as default }

const app= express(); 
dbConnection()



//swagger

app.use('/api-doc', swaggerUI.serve);
app.get('/api-doc', swaggerUI.setup(swaggerSpect));


app.put('/api/users/:historyId', responseOpenApiAI); 


//middleware 
app.use(express.json())
app.use('/api', userRoutes);




app.get('/',(request, response, error)=> {
    response.send('status: ok, Esta todo biennn!!' )

} )

app.listen(port, (error)=>{
    if (error){
        console.log('sErVeR error: failed');
        process.exit(1)
    }

    console.log(`server litening in por ${port}`);
})
console.log("hola");



 





