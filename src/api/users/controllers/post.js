import User from '../../../models/users.js';


const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'Creado',
      message: 'Usuario creado con éxito',
      user: user,
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(400).json({
      status: 'Error',
      message: 'Ha ocurrido un error al intentar crear el usuario',
    });
  }
};

export {
  createUser,
};