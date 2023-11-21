import User from '../../../models/users.js'

const deleteOne = async(req,res) => { 
  try {
    const { id } = req.params;
    const removed = await User.findByIdAndDelete(id);
    console.log(removed);
    res.status(200).json(`${removed} delete from database`);
  } catch (error) {
    res.status(404).json({menssage: `Error al eliminar la información: ${error}`})
  }
};

export default deleteOne;

