import mongoose from 'mongoose';
import { dbUrl } from './config';


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

const connect = ()=> {
    mongoose.connect(dbUrl, options, (err)=> {
        if(err) { 
            console.log('An error occured while connecting to db', err)
        } else {
            console.log('Database connection was successful')
        }
    });
}
const disconnect = ()=> { mongoose.connection.close() }
const db = { connect, disconnect };


export default db;
