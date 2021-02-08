import mongoose from 'mongoose';

export let db: mongoose.Connection;

export async function initDatabaseConnection(url: string): Promise<void> {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      connectTimeoutMS: 10000,
    });

    console.log('Connected to Mongo...');

    return Promise.resolve();
  } catch (err: unknown) {
    return Promise.reject(err);
  }
}
