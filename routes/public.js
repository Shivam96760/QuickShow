import { Router } from "express"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Booking from "../models/Booking.js"
import { isLoggedIn } from "../middleware/auth.js"

const router = Router()

// ---------- Home ----------
router.get("/", async (req, res) => {
  try {
    const rawMovies = await Movie.find().sort({ createdAt: -1 }).limit(8).lean()
    const movies = rawMovies.map((m) => ({ ...m, id: m.slug }))
    const featured = movies[0] || null
    res.render("pages/home", {
      title: "QuickShow — Book Movie Tickets",
      featured,
      movies,
    })
  } catch (err) {
    console.error("[Public] Home error:", err)
    res.render("pages/home", {
      title: "QuickShow — Book Movie Tickets",
      featured: null,
      movies: [],
    })
  }
})

// ---------- All Movies ----------
router.get("/movies", async (req, res) => {
  try {
    const rawMovies = await Movie.find().sort({ year: -1 }).lean()
    const movies = rawMovies.map((m) => ({ ...m, id: m.slug }))
    res.render("pages/movies", {
      title: "Movies — QuickShow",
      movies,
    })
  } catch (err) {
    console.error("[Public] Movies error:", err)
    res.render("pages/movies", { title: "Movies — QuickShow", movies: [] })
  }
})

// ---------- Movie Details ----------
router.get("/movies/:slug", async (req, res) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug }).lean()
    if (!movie) return res.redirect("/movies")

    // Get shows for this movie grouped by date (next 5 days)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 5)

    const rawShows = await Show.find({
      movie: movie._id,
      date: { $gte: today, $lt: endDate },
    })
      .sort({ date: 1 })
      .lean()

    // Group shows by date
    const showsByDate = {}
    rawShows.forEach((s) => {
      const key = s.date.toISOString().slice(0, 10)
      if (!showsByDate[key]) {
        const d = new Date(s.date)
        showsByDate[key] = {
          key,
          day: d.toLocaleDateString("en-US", { weekday: "short" }),
          date: d.getDate(),
          month: d.toLocaleDateString("en-US", { month: "short" }),
          times: [],
          showIds: {},
        }
      }
      showsByDate[key].times.push(s.time)
      showsByDate[key].showIds[s.time] = s._id.toString()
    })

    // If no shows in DB, generate placeholder dates (for display)
    let shows = Object.values(showsByDate)
    if (shows.length === 0) {
      for (let i = 0; i < 5; i++) {
        const d = new Date(today)
        d.setDate(d.getDate() + i)
        shows.push({
          key: d.toISOString().slice(0, 10),
          day: d.toLocaleDateString("en-US", { weekday: "short" }),
          date: d.getDate(),
          month: d.toLocaleDateString("en-US", { month: "short" }),
          times: ["10:30 AM", "1:45 PM", "4:30 PM", "7:30 PM"],
          showIds: {},
        })
      }
    }

    res.render("pages/movie-details", {
      title: `${movie.title} — QuickShow`,
      movie: { ...movie, id: movie.slug },
      shows,
    })
  } catch (err) {
    console.error("[Public] Movie details error:", err)
    res.redirect("/movies")
  }
})

// ---------- Seat Selection ----------
router.get("/seats/:showId", async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate("movie")
      .lean()

    if (!show) {
      // Fallback: try parsing the old-style slug-based ID
      return res.redirect("/movies")
    }

    const movieData = show.movie
    const dateObj = new Date(show.date)
    const showTime = `${dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })} · ${show.time}`

    res.render("pages/seat-layout", {
      title: "Select Seats — QuickShow",
      movie: { ...movieData, id: movieData.slug },
      showId: show._id.toString(),
      showTime,
      pricePerSeat: show.price,
      occupied: show.occupiedSeats || [],
    })
  } catch (err) {
    console.error("[Public] Seat layout error:", err)
    res.redirect("/movies")
  }
})

// ---------- Checkout ----------
router.get("/checkout", isLoggedIn, async (req, res) => {
  try {
    const { showId, seats } = req.query
    if (!showId || !seats) return res.redirect("/movies")

    const seatList = seats.split(",")
    const show = await Show.findById(showId).populate("movie").lean()
    if (!show) return res.redirect("/movies")

    const movieData = show.movie
    const dateObj = new Date(show.date)
    const showTime = `${dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })} · ${show.time}`

    res.render("pages/checkout", {
      title: "Checkout — QuickShow",
      movie: { ...movieData, id: movieData.slug },
      showId: show._id.toString(),
      showTime,
      seats: seatList,
      pricePerSeat: show.price,
    })
  } catch (err) {
    console.error("[Public] Checkout error:", err)
    res.redirect("/movies")
  }
})

// ---------- My Bookings ----------
router.get("/my-bookings", isLoggedIn, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.session.user._id })
      .populate("movie")
      .populate("show")
      .sort({ createdAt: -1 })
      .lean()

    // Transform bookings to match EJS template expectations
    const transformed = bookings.map((b) => {
      const dateObj = b.show ? new Date(b.show.date) : new Date()
      const showTime = b.show ? b.show.time : ""
      return {
        id: b.bookingId,
        user: req.session.user.name,
        movie: {
          ...b.movie,
          id: b.movie?.slug || "",
        },
        date: b.show
          ? `${dateObj.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })} · ${showTime}`
          : "N/A",
        seats: b.seats,
        amount: b.amount,
        status: b.status,
      }
    })

    res.render("pages/my-bookings", {
      title: "My Bookings — QuickShow",
      bookings: transformed,
    })
  } catch (err) {
    console.error("[Public] My bookings error:", err)
    res.render("pages/my-bookings", {
      title: "My Bookings — QuickShow",
      bookings: [],
    })
  }
})

// ---------- Favorites ----------
router.get("/favorites", async (req, res) => {
  try {
    const movies = await Movie.find().lean()
    const moviesWithId = movies.map((m) => ({ ...m, id: m.slug }))
    res.render("pages/favorites", {
      title: "Favorites — QuickShow",
      movies: moviesWithId,
    })
  } catch (err) {
    console.error("[Public] Favorites error:", err)
    res.render("pages/favorites", {
      title: "Favorites — QuickShow",
      movies: [],
    })
  }
})

export default router
