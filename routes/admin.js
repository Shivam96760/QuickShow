import { Router } from "express"
import { isAdmin } from "../middleware/auth.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Booking from "../models/Booking.js"

const router = Router()

// All admin routes require admin role
router.use(isAdmin)

// ---------- Dashboard ----------
router.get("/", async (req, res) => {
  try {
    const [movieCount, showCount, bookingCount, revenueAgg, recentBookings] =
      await Promise.all([
        Movie.countDocuments(),
        Show.countDocuments(),
        Booking.countDocuments(),
        Booking.aggregate([
          { $match: { status: { $ne: "Cancelled" } } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        Booking.find()
          .populate("movie")
          .populate("show")
          .sort({ createdAt: -1 })
          .limit(5)
          .lean(),
      ])

    const revenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0

    const stats = {
      movies: movieCount,
      shows: showCount,
      bookings: bookingCount,
      revenue,
    }

    // Transform bookings for template
    const shows = recentBookings.map((b) => {
      const dateObj = b.show ? new Date(b.show.date) : new Date()
      return {
        id: b.bookingId,
        user: "User",
        movie: b.movie
          ? { ...b.movie, id: b.movie.slug }
          : { title: "Unknown", poster: "", genres: [], runtime: "" },
        date: b.show
          ? `${dateObj.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })} · ${b.show.time}`
          : "N/A",
        seats: b.seats,
        amount: b.amount,
        status: b.status,
      }
    })

    res.render("pages/admin/dashboard", {
      title: "Dashboard — QuickShow Admin",
      stats,
      shows,
    })
  } catch (err) {
    console.error("[Admin] Dashboard error:", err)
    res.render("pages/admin/dashboard", {
      title: "Dashboard — QuickShow Admin",
      stats: { movies: 0, shows: 0, bookings: 0, revenue: 0 },
      shows: [],
    })
  }
})

// ---------- Add Shows ----------
router.get("/add-shows", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ title: 1 }).lean()
    const moviesWithId = movies.map((m) => ({ ...m, id: m.slug }))
    res.render("pages/admin/add-shows", {
      title: "Add Shows — QuickShow Admin",
      movies: moviesWithId,
    })
  } catch (err) {
    console.error("[Admin] Add shows error:", err)
    res.render("pages/admin/add-shows", {
      title: "Add Shows — QuickShow Admin",
      movies: [],
    })
  }
})

//---------- List Shows ----------
router.get("/list-shows", async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .sort({ date: -1 })
      .lean()

    const rows = shows.map((s) => {
      const dateObj = new Date(s.date)
      return {
        _id: s._id.toString(),
        movie: s.movie?.title || "Unknown",
        time: `${dateObj.toISOString().slice(0, 10)} ${s.time}`,
        price: s.price,
        booked: s.occupiedSeats?.length || 0,
      }
    })

    res.render("pages/admin/list-shows", {
      title: "List Shows — QuickShow Admin",
      rows,
    })
  } catch (err) {
    console.error("[Admin] List shows error:", err)
    res.render("pages/admin/list-shows", {
      title: "List Shows — QuickShow Admin",
      rows: [],
    })
  }
})

// ---------- List Bookings ----------
router.get("/list-bookings", async (req, res) => {
  try {
    const rawBookings = await Booking.find()
      .populate("user")
      .populate("movie")
      .populate("show")
      .sort({ createdAt: -1 })
      .lean()

    const bookings = rawBookings.map((b) => {
      const dateObj = b.show ? new Date(b.show.date) : new Date()
      return {
        id: b.bookingId,
        user: b.user?.name || "Unknown",
        movie: b.movie
          ? { ...b.movie, id: b.movie.slug }
          : { title: "Unknown", poster: "", genres: [], runtime: "" },
        date: b.show
          ? `${dateObj.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })} · ${b.show.time}`
          : "N/A",
        seats: b.seats,
        amount: b.amount,
        status: b.status,
      }
    })

    res.render("pages/admin/list-bookings", {
      title: "List Bookings — QuickShow Admin",
      bookings,
    })
  } catch (err) {
    console.error("[Admin] List bookings error:", err)
    res.render("pages/admin/list-bookings", {
      title: "List Bookings — QuickShow Admin",
      bookings: [],
    })
  }
})

export default router
