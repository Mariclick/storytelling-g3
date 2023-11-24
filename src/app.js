import express from 'express';
import swaggerUi from 'swagger-ui-express';
import indexRoutes from './api/users/routes/index.routes.js';
import { port } from './config/index.js';
import dbConnection from './config/db.js';
import { openApiSpecification } from './config/swagger.js';

const app = express();

//middlewares
app.use(express.json());


dbConnection();

// Routes
app.use(
    indexRoutes, 
    );

// Swagger
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(openApiSpecification));




app.get('/',(request, response, error)=> {
    response.send('status: ok, Esta todo biennn!!' )

} )


app.listen(port, (error) => {

    if(error){
        console.log('Server errror: Failed');
        process.exit(1);
    }
    
    console.log(`Server listening in port ${port} `)
})
console.log("Holaaaaa");


