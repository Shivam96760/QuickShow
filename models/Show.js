import mongoose from "mongoose"

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // e.g. "7:30 PM"
    price: { type: Number, required: true, min: 0 },
    totalSeats: { type: Number, default: 90 },
    occupiedSeats: [{ type: String }], // e.g. ["A3","B7"]
  },
  { timestamps: true }
)

// Virtual: display-friendly date string
showSchema.virtual("displayDate").get(function () {
  return this.date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
})

// Virtual: available seat count
showSchema.virtual("availableSeats").get(function () {
  return this.totalSeats - this.occupiedSeats.length
})

showSchema.set("toJSON", { virtuals: true })
showSchema.set("toObject", { virtuals: true })

export default mongoose.model("Show", showSchema)
