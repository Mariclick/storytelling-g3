import * as dotenv from 'dotenv';

dotenv.config();

export const port= process.env.PORT;
export const db_uri = process.env.MONGO_URI;
export const opEnai = process.env.OPEN_API_KEY;
