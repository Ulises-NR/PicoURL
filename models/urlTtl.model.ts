import mongoose, { Schema } from "mongoose";

const UrlTtlSchema = new Schema(
  {
    originalURL: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

UrlTtlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const UrlTtl =
  mongoose.models.urlTtl ?? mongoose.model("urlTtl", UrlTtlSchema, "urlTtl");

export default UrlTtl;
