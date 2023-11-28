import express, { request } from "express";   // llamo a expres 
const router = express.Router()  // crear un enrutador, retorna un objeto router constructor

import  miModelo from "../models/users.js";



// CREAR USUARIO 
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - nombre
 *          - empresa
 *          - mision
 *          - genero
 *          - protagonista
 *          - objetivo
 *          - motivacion
 *          - malo: 
            - ayudante
 *          - actitud
            - mensaje
 *          - comportamiento
 *          - responseAi
 *          
 *        properties:

 *          nombre:
 *            type: string
 *      
 *          empresa:
 *            type: string
 *          mision:
 *            type: string
 *          genero:
 *            type: string
 *          protagonista:
 *            type: string
 *          objetivo:
 *            type: string
 *          motivacion:
 *            type: string
 *          malo:
 *            type: string
 *          ayudante:
 *            type: string
 *          actitud:
 *            type: string     
 *          mensaje:
 *            type: string       
 *          comportamiento:
 *            type: string  
 *         responseAi
 *            type: string
 *        


//Users

/**
 * @swagger
 * /users:
 *   post:
 *    description: Creation API for users
 *    summary: create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schema/User'
 *    responses:
 *      201:
 *        description: new user created
 *      400:
 *        description: Bad request
 */

router.post('/users', (req, res) => { // funcion recibe el objeto de la peticion y obj de la resp 

  const user = miModelo(req.body);  //esto nos va a crear unusuario, con los datos q llegan del cuerpo de la peticion
  user
    .save() //guarda bd
    .then((data) => res.json(data)) //responde mostrando los datos
    .catch((error) => res.json({message:error})) // msj de error */
});

/**
 * @swagger
 * /users:
 *   get:
 *    summary: return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schema/User'
 *      500:
 *        description: Internal Server Error
 */

router.get('/users', (req, res) => {   
  miModelo
   .find() 
   .then((data) => res.json(data)) 
   .catch((error) => res.json({message:error})) 
 });

/**
 * @swagger
 * /user:
 *   get:
 *    summary: return a user
 *    tags: [User]
 *    parameters:
 *      - name: name
 *        in: query
 *        description: search by name
 *        schema: 
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: the user name
 *        content:
 *            application/json:
 *              schema:
 *                type: objet
 *                $ref: '#components/schema/User'
 *      404: 
 *        description: OOPS! Not Found
 *      500:
 *        description: Internal Server Error
 */

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  miModelo
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *    summary: update a user
 *    tags: [User]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: the user id
 *        schema: 
 *          type: string
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schema/Patch'
 *    responses:
 *      200:
 *        description: user updated
 *      400: 
 *        description: Your request gives error
 */

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, enlace, empresa, mision, genero, protagonista, objetivo, motivacion, malo, ayudante, actitud, mensaje, comportamiento, responseAI } = req.body;
  miModelo
    .updateOne({ _id: id }, { $set: { nombre, enlace, empresa, mision, genero, protagonista, objetivo, motivacion, malo, ayudante, actitud, mensaje, comportamiento, responseAI } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *    summary: delete a user
 *    tags: [User]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: the user id
 *        schema: 
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: user delete
 *      404: 
 *        description: OOPS! Not Found
 */

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const data = await miModelo.remove({ _id: id });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});






export { router as default }


