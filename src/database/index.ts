import { Db, MongoClient } from 'mongodb';

import { environment } from '../environment';

export let db: Db;

export async function initDatabaseConnection(): Promise<Db> {
  if (db) {
    return Promise.resolve(db);
  }

  const URL = environment.mongo.url;

  const client = new MongoClient(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  await client.connect();

  console.log('Connected to Mongo...');
  db = client.db();
  return Promise.resolve(db);
}
