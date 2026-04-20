import { Router } from "express"
import { isLoggedIn, isAdmin } from "../middleware/auth.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Booking from "../models/Booking.js"

const router = Router()

//  ========== BOOKINGS ==========

// POST /api/bookings — Create a new booking
router.post("/bookings", isLoggedIn, async (req, res) => {
  try {
    const { showId, seats } = req.body

    if (!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ error: "Show ID and seats are required." })
    }

    if (seats.length > 5) {
      return res
        .status(400)
        .json({ error: "Maximum 5 seats per booking." })
    }

    const show = await Show.findById(showId)
    if (!show) {
      return res.status(404).json({ error: "Show not found." })
    }

    // Check if any selected seats are already occupied
    const alreadyOccupied = seats.filter((s) =>
      show.occupiedSeats.includes(s)
    )
    if (alreadyOccupied.length > 0) {
      return res.status(409).json({
        error: `Seats already taken: ${alreadyOccupied.join(", ")}`,
      })
    }

    // Mark seats as occupied
    show.occupiedSeats.push(...seats)
    await show.save()

    // Calculate amount
    const amount = seats.length * show.price + 35 // +35 convenience fee

    // Create booking
    const booking = await Booking.create({
      user: req.session.user._id,
      show: show._id,
      movie: show.movie,
      seats,
      amount,
      status: "Confirmed",
    })

    res.status(201).json({
      success: true,
      bookingId: booking.bookingId,
      message: "Booking confirmed!",
    })
  } catch (err) {
    console.error("[API] Create booking error:", err)
    res.status(500).json({ error: "Failed to create booking." })
  }
})

// PATCH /api/bookings/:bookingId/cancel — Cancel a booking
router.patch("/bookings/:bookingId/cancel", isLoggedIn, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingId: req.params.bookingId,
    })

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." })
    }

    // Only the booking owner or admin can cancel
    const isOwner = booking.user.toString() === req.session.user._id
    const userIsAdmin = req.session.user.role === "admin"
    if (!isOwner && !userIsAdmin) {
      return res.status(403).json({ error: "Not authorized." })
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({ error: "Booking already cancelled." })
    }

    // Free up the seats
    const show = await Show.findById(booking.show)
    if (show) {
      show.occupiedSeats = show.occupiedSeats.filter(
        (s) => !booking.seats.includes(s)
      )
      await show.save()
    }

    booking.status = "Cancelled"
    await booking.save()

    res.json({ success: true, message: "Booking cancelled." })
  } catch (err) {
    console.error("[API] Cancel booking error:", err)
    res.status(500).json({ error: "Failed to cancel booking." })
  }
})

// ========== SHOWS (Admin) ==========

// POST /api/shows — Create new shows
router.post("/shows", isAdmin, async (req, res) => {
  try {
    const { movieSlug, price, slots } = req.body

    if (!movieSlug || !price || !slots || !Array.isArray(slots) || slots.length === 0) {
      return res
        .status(400)
        .json({ error: "Movie, price, and at least one slot are required." })
    }

    const movie = await Movie.findOne({ slug: movieSlug })
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." })
    }

    const created = []
    for (const slot of slots) {
      // Convert time from 24h to 12h format
      const [hours, minutes] = slot.time.split(":")
      const h = parseInt(hours, 10)
      const ampm = h >= 12 ? "PM" : "AM"
      const h12 = h % 12 || 12
      const displayTime = `${h12}:${minutes} ${ampm}`

      const show = await Show.create({
        movie: movie._id,
        date: new Date(slot.date),
        time: displayTime,
        price: Number(price),
        totalSeats: 90,
        occupiedSeats: [],
      })
      created.push(show)
    }

    res.status(201).json({
      success: true,
      message: `${created.length} show(s) created.`,
      count: created.length,
    })
  } catch (err) {
    console.error("[API] Create shows error:", err)
    res.status(500).json({ error: "Failed to create shows." })
  }
})

// DELETE /api/shows/:id — Delete a show
router.delete("/shows/:id", isAdmin, async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id)
    if (!show) {
      return res.status(404).json({ error: "Show not found." })
    }

    // Also delete bookings for this show
    await Booking.deleteMany({ show: show._id })

    res.json({ success: true, message: "Show deleted." })
  } catch (err) {
    console.error("[API] Delete show error:", err)
    res.status(500).json({ error: "Failed to delete show." })
  }
})

export default router
