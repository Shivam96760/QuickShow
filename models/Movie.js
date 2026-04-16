import mongoose from "mongoose"

const castSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { _id: false }
)

const movieSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    overview: { type: String, default: "" },
    genres: [{ type: String }],
    runtime: { type: String, default: "" },
    rating: { type: Number, default: 0, min: 0, max: 10 },
    year: { type: Number },
    poster: { type: String, default: "" },
    backdrop: { type: String, default: "" },
    trailer: { type: String, default: "" },
    casts: [castSchema],
  },
  { timestamps: true }
)

export default mongoose.model("Movie", movieSchema)
