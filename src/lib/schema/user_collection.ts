import mongoose, { Schema } from "mongoose";

export const createDynamicModel = (collectionName: string) => {
    const schema = new Schema({}, { strict: false }); // Allows flexible schema
    return mongoose.models[collectionName] || mongoose.model(collectionName, schema, collectionName);
};
