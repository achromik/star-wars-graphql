import { Document } from 'mongoose';

export const addIdField = <T extends Document>() => ({
  type: 'MongoID',
  resolve: (source: T) => source._id,
  projection: { _id: true },
});
