import { Db, MongoClient } from 'mongodb';

export let db: Db;

export async function initDatabaseConnection(url: string): Promise<Db> {
  if (db) {
    return Promise.resolve(db);
  }

  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 600,
  });

  try {
    await client.connect();

    console.log('Connected to Mongo...');
    db = client.db();
    return Promise.resolve(db);
  } catch (err: unknown) {
    return Promise.reject(err);
  }
}
