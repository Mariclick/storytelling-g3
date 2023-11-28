//mongodb+srv://Mothership:Le0Uuyvu@mothership.fva2lm4.mongodb.net/?retryWrites=true&w=majority
import {connect} from 'mongoose';
import {db_uri} from './index.js'

//Database connection
const dbConnection = async () =>{
    try {
      const db = await connect(db_uri);
      console.log('Database connection se conecto!!!!!1', db.connection.name);
    } catch(error){
      console.error('Database connection error no se conecto', error)
    }
  };
  
  export { dbConnection as default }