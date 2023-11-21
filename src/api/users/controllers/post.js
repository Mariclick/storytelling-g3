import User from '../../../models/users.js';


const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(`${user} Creado`);
  } catch (error){
    res.status(400).json({message: 'hay un error!?'});
  }
};

export {
  createUser,
};