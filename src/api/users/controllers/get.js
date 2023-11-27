import getUserBy from '../helpers.js';

const getByName =  async(req,res) =>{
  try {
    const {nombre} = req.query;
    const personajeEncontrado = await getUserBy(nombre);
    if(!personajeEncontrado.length) {
      return res.status(404).json({message: " Not Found"});
    }
    res.status(200).json(personajeEncontrado)  
    
  } catch (error) {
    res.status(500).json('Internal Server Error')  
  }
};

/*router.get('/users', (req, res) => {
  miModelo
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});*/

export {
  getByName,
};