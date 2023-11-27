
import { Router } from 'express';
import {
  validateCreation,
  validatePatch,
} from '../validation/post.js';

import {
  getByName,
} from '../controllers/get.js';

import {
  createUser,
} from '../controllers/post.js';
import editUser from '../controllers/patch.js';
import deleteOne from '../controllers/delete.js';

const router = Router();

/**
 * @swagger
 *  components:
 *    schema:
 *      User:
 *        type: object
 *        required:
 *          - nombre
 *          - enlace
 *          - empresa
 *          - mision
 *          - genero
 *          - protagonista: 
            - objetivo
 *          - motivacion
            - malo
 *          - ayudante
 *          - actitud
 *          - mensaje
 *          - comportamiento
 *          - responseAi
 *          
 * 
 *        properties:
 *          nombre:
 *            type: string
 *          enlace:
 *            type: string
 *            format: email
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
 * 
 *  
 */

// Users

/**
 * @swagger
 * /users:
 *   post:
 *     description: Creation API 
 *     summary: create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#components/schema/User'
 *     responses:
 *       201:
 *         description: new user created
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: return all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schema/User'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: return a user
 *     tags: [User]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: search by name
 *         schema: 
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the user name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schema/User'
 *       404: 
 *         description: OOPS! Not Found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: update a user
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id del usuario
 *         schema: 
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#components/schema/Patch'
 *     responses:
 *       200:
 *         description: user updated
 *       400: 
 *         description: Your request gives error
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: delete a user
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: the user id
 *         schema: 
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user delete
 *       404: 
 *         description: OOPS! Not Found
 */

router
  .post('/users', validateCreation, createUser)
  .get('/user', getByName)
  .patch('/user/:id', validatePatch, editUser)
  .delete('/user/:id', validateCreation, deleteOne);

export default router;