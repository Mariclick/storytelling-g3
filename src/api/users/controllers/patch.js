import User from '../../../models/users.js'

const editUser = async (req, res) => {

  const { id } = req.params;
  const {nombre, genero, protagonista,objetivo, motivacion, malo, ayudante, actitud} = req.body;
  await User
    .updateOne({
      _id: id
    },{
       $set:
       { ...nombre && {nombre}, 
        ...genero && {genero},
        ...protagonista && {protagonista},
        ...objetivo && {objetivo},
        ...motivacion && {motivacion},
        ...malo && {malo},
        ...ayudante && {ayudante},
        ...actitud && {actitud}
      
      }
    })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({message: 'Your request gives error'}));
};

export default editUser;