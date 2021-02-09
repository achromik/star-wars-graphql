import { Document } from 'mongoose';

export const idField = <T extends Document>() => ({
  type: 'MongoID',
  resolve: (source: T) => source._id,
  projection: { _id: true },
});
