import mongoose from 'mongoose';

console.log('MONGO_URI', process.env.MONGO_URI);

const MONGO_URI: any = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

let connection: any = null;

async function connectToDatabase() {
  if (connection) {
    return connection;
  }

  try {
    connection = await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;
