import dotenv from 'dotenv';
import app from './app';
import db from './db';


dotenv.config();
db.connect();

// Get the port to listen on
const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`API is listening on ${port}`);
});


process.on('SIGINT', () => {
  console.warn('Shutting down server...');
  db.disconnect() // properly close db connection
  console.log('Server successfully shutdown');
  process.exit(0);
});