import mongoose from 'mongoose';
import { dbUrl, environment } from './config';


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

const connect = ()=> {
    mongoose.connect(dbUrl, options, (err)=> {
        if(err) { 
            console.log(`An error occured while connecting to db on ${environment} environment`, err)
        }
    });
}
const disconnect = ()=> { mongoose.connection.close() }
const db = { connect, disconnect };


export default db;
