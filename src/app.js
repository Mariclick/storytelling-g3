import express from 'express';
<<<<<<< HEAD
import cors from 'cors';
=======
>>>>>>> a73ea703ec6df9a981081005c5ca24a0a1fc59f1
import swaggerUi from 'swagger-ui-express';
import indexRoutes from './api/users/routes/index.routes.js';
import { port } from './config/index.js';
import dbConnection from './config/db.js';
import { openApiSpecification } from './config/swagger.js';

const app = express();

//middlewares
app.use(express.json());

<<<<<<< HEAD
app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }));
  
  app.options('*', cors());
=======
>>>>>>> a73ea703ec6df9a981081005c5ca24a0a1fc59f1

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


