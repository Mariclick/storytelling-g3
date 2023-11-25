import getUserBy from '../helpers.js';

const getByName =  async(req,res) =>{
  try {
    const {name} = req.query;
    const personajeEncontrado = await getUserBy(name);
    if(!personajeEncontrado.length) {
      return res.status(404).json({message: " Not Found"});
    }
    res.status(200).json(personajeEncontrado)  
    
  } catch (error) {
    res.status(500).json('Internal Server Error')  
  }
};

export {
  getByName,
};