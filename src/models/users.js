import {Schema, model} from 'mongoose'

const miModelo = new Schema({
  nombre: {
    type: String,
    require: true,  
  },
  enlace: {
    type: String,
    require: true,
  },
  empresa: {
    type: String,
    require: true,
  },
  mision: {
    type: String,
    require: true,
  },
  genero: { 
    type: String, 
    require: true
  },
  protagonista: {  
    type: String,
    require: true
  },
  objetivo: { 
    type: String, 
    require: true
  },
  motivacion: {  
    type: String,
    require: true
  },
  malo: { 
    type: String, 
    require: true
  },
  ayudante: {  
    type: String,
    require: true
  },
  actitud: { 
    type: String, 
    require: true
  },
  mensaje: {  
    type: String,
    require: true
  },
  comportamiento: {
    type: String,
    require: true,
  },
  responseAI: {
    type: String,
    required: false
}

  
});

export default model('User', miModelo);

 
