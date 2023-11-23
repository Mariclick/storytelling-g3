import User from '../../models/users.js'

const getUserBy = async (filter) => {

  const personajeEncontrado = await User.find(filter);
  console.log(personajeEncontrado);
  return personajeEncontrado;
};

export default getUserBy;
