import Joi from 'joi'


const createUserSchema = Joi.object({
  nombre: Joi.string()
    .required()
    .min(3)
    .max(30),

  enlace: Joi.string()
    .email()
    .required(),
  genero: Joi.string()
    .required()
    .min(3)
    .max(30),
  protagonista: Joi.string()
    .required()
    .min(3)
    .max(30),
  objetivo: Joi.string()
    .required()
    .min(3)
    .max(30),
  motivacion: Joi.string()
    .required()
    .min(3)
    .max(30),
  malo: Joi.string()
    .required(),
  ayudante: Joi.string()
    .required()
    .min(3)
    .max(30),
  actitud: Joi.string()
    .required()
    .min(3)
    .max(30),
  mensaje: Joi.string()
    .required()
    .min(3)
    .max(100),

});

const patchUserSchema = Joi.object({
  nombre: Joi.string()
    .required()
    .min(3)
    .max(30),

  enlace: Joi.string()
    .email()
    .required(),
  genero: Joi.string()
    .required()
    .min(3)
    .max(30),
  protagonista: Joi.string()
    .required()
    .min(3)
    .max(30),
  objetivo: Joi.string()
    .required()
    .min(3)
    .max(30),
  motivacion: Joi.string()
    .required()
    .min(3)
    .max(30),
  malo: Joi.string()
    .required(),
  ayudante: Joi.string()
    .required()
    .min(3)
    .max(30),
  actitud: Joi.string()
    .required()
    .min(3)
    .max(30),
  mensaje: Joi.string()
    .required()
    .min(3)
    .max(100),
});


const validateCreation = async(request, response, next) => {
  await createUserSchema.validate(request.body);
  next();
  try { 
  } catch (error) {
    response.send(error);
  }
};

const validatePatch = async(request, response, next) => {
  await patchUserSchema.validate(request.body);
  next();
  try { 
  } catch (error) {
    response.send(error);
  }
};



export {
  validateCreation, 
  validatePatch,
};