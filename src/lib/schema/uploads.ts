import mongoose, { Schema, Document, model } from "mongoose";

export interface UploadDocument extends Document {
  name: string;
  email: string;
  content: string;
  uploadedAt: Date;
}

const UploadSchema = new Schema<UploadDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const UploadModel =  mongoose.models.Upload || model<UploadDocument>("Upload", UploadSchema);

export default UploadModel;
