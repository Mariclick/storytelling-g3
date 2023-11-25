import User from '../../../models/users.js'

const editUser = async (req, res) => {

  const { id } = req.params;
  const {nombre, enlace, empresa, mision, genero, protagonista,objetivo, motivacion, malo, ayudante,actitud,  mensaje, comportamiento} = req.body;
  await User
    .updateOne({
      _id: id
    },{
       $set:
       { ...nombre && {nombre}, 
        ...enlace && {enlace},
        ...empresa && {empresa},
        ...mision && {mision},
        ...genero && {genero},
        ...protagonista && {protagonista},
        ...objetivo && {objetivo},
        ...motivacion && {motivacion},
        ...malo && {malo},
        ...ayudante && {actitud},
        ...actitud && {genero},
        ...mensaje && {mensaje},
        ...comportamiento && {comportamiento}
      }
    })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({message: 'Your request gives error'}));
};

export default editUser;