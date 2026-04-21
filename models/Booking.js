import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    seats: [{ type: String, required: true }],
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Confirmed",
    },
  },
  { timestamps: true }
)

// Auto-generate booking ID before saving
bookingSchema.pre("save", async function () {
  if (!this.bookingId) {
    const count = await mongoose.model("Booking").countDocuments()
    this.bookingId = `BK-${String(count + 1).padStart(5, "0")}`
  }
})

export default mongoose.model("Booking", bookingSchema)
