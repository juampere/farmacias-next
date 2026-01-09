import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, agrega tu variable MONGODB_URI al archivo .env.local');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;