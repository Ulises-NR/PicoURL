import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const UrlSchema = new Schema(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

UrlSchema.plugin(paginate);

const Url = mongoose.models.url ?? mongoose.model("url", UrlSchema);

export default Url;
