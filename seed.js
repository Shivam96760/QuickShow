import "dotenv/config"
import mongoose from "mongoose"
import User from "./models/User.js"
import Movie from "./models/Movie.js"
import Show from "./models/Show.js"
import Booking from "./models/Booking.js"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/quickshow"

// ─── Movie seed data (from original mock.js) ───
const defaultCasts = [
  { name: "Leonardo DiCaprio", image: "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
  { name: "Joseph Gordon-Levitt", image: "https://image.tmdb.org/t/p/w185/4U9G4YwTlIEbAymBaseltS38eH4.jpg" },
  { name: "Elliot Page", image: "https://image.tmdb.org/t/p/w185/5NvTy0ac2dNEO4GHvVAvZF9O6B3.jpg" },
  { name: "Tom Hardy", image: "https://image.tmdb.org/t/p/w185/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg" },
  { name: "Cillian Murphy", image: "https://image.tmdb.org/t/p/w185/llkbyWKwpfowZ6C8peBjIV9jj99.jpg" },
  { name: "Marion Cotillard", image: "https://image.tmdb.org/t/p/w185/h2bLb8W6zQcgDGAd7Nq4vPOHLLg.jpg" },
]

const moviesData = [
  {
    slug: "inception",
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: "2h 28m",
    rating: 8.8,
    year: 2010,
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailer: "YoHD9XEInc0",
    casts: defaultCasts,
  },
  {
    slug: "interstellar",
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: "2h 49m",
    rating: 8.6,
    year: 2014,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg",
    trailer: "zSWdZVtXT7E",
    casts: defaultCasts,
  },
  {
    slug: "dark-knight",
    title: "The Dark Knight",
    tagline: "Why so serious?",
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 32m",
    rating: 9.0,
    year: 2008,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    trailer: "EXeTwQWrcwY",
    casts: defaultCasts,
  },
  {
    slug: "dune-part-two",
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview: "Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    genres: ["Sci-Fi", "Adventure"],
    runtime: "2h 46m",
    rating: 8.5,
    year: 2024,
    poster: "https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    trailer: "Way9Dexny3w",
    casts: defaultCasts,
  },
  {
    slug: "oppenheimer",
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    overview: "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    genres: ["Drama", "History"],
    runtime: "3h 0m",
    rating: 8.3,
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    trailer: "uYPbbksJxIg",
    casts: defaultCasts,
  },
  {
    slug: "spider-verse",
    title: "Across the Spider-Verse",
    tagline: "It's how you wear the mask that matters.",
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    genres: ["Animation", "Action", "Adventure"],
    runtime: "2h 20m",
    rating: 8.6,
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    trailer: "cqGjhVJWtEg",
    casts: defaultCasts,
  },
  {
    slug: "joker",
    title: "Joker",
    tagline: "Put on a happy face.",
    overview: "In Gotham City, mentally troubled comedian Arthur Fleck embarks on a downward spiral.",
    genres: ["Crime", "Drama", "Thriller"],
    runtime: "2h 2m",
    rating: 8.4,
    year: 2019,
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    trailer: "zAGVQLHvwOY",
    casts: defaultCasts,
  },
  {
    slug: "avatar-way-of-water",
    title: "Avatar: The Way of Water",
    tagline: "Return to Pandora.",
    overview: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    genres: ["Sci-Fi", "Adventure"],
    runtime: "3h 12m",
    rating: 7.6,
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    trailer: "d9MyW72ELq0",
    casts: defaultCasts,
  },
]

// Show times to generate per movie per day
const timesPerDay = [
  ["10:30 AM", "1:45 PM", "4:30 PM", "7:30 PM", "10:15 PM"],
  ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"],
  ["12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"],
  ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:30 PM"],
  ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"],
]

async function seed() {
  try {
    console.log("[Seed] Connecting to MongoDB...")
    await mongoose.connect(MONGODB_URI)
    console.log("[Seed] Connected!")

    // Clear existing data
    console.log("[Seed] Clearing existing data...")
    await Promise.all([
      User.deleteMany({}),
      Movie.deleteMany({}),
      Show.deleteMany({}),
      Booking.deleteMany({}),
    ])

    // Create users
    console.log("[Seed] Creating users...")
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@quickshow.com",
      password: "admin123",
      role: "admin",
    })

    const demoUser = await User.create({
      name: "Rahul Sharma",
      email: "rahul@example.com",
      password: "user123",
      role: "user",
    })

    console.log("[Seed] Users created:")
    console.log("  Admin: admin@quickshow.com / admin123")
    console.log("  User:  rahul@example.com / user123")

    // Create movies
    console.log("[Seed] Creating movies...")
    const movies = await Movie.insertMany(moviesData)
    console.log(`[Seed] ${movies.length} movies created.`)

    // Create shows for each movie (next 5 days)
    console.log("[Seed] Creating shows...")
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let showCount = 0
    const allShows = []

    for (const movie of movies) {
      for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
        const date = new Date(today)
        date.setDate(date.getDate() + dayOffset)
        const times = timesPerDay[dayOffset]
        const price = 200 + Math.floor(Math.random() * 100) // 200-300

        for (const time of times) {
          // Add some random occupied seats
          const occupiedCount = Math.floor(Math.random() * 12)
          const occupiedSeats = []
          const rows = "ABCDEFGHIJ"
          for (let i = 0; i < occupiedCount; i++) {
            const seat = rows[Math.floor(Math.random() * 10)] + (Math.floor(Math.random() * 9) + 1)
            if (!occupiedSeats.includes(seat)) occupiedSeats.push(seat)
          }

          const show = await Show.create({
            movie: movie._id,
            date,
            time,
            price,
            totalSeats: 90,
            occupiedSeats,
          })
          allShows.push(show)
          showCount++
        }
      }
    }
    console.log(`[Seed] ${showCount} shows created.`)

    // Create sample bookings
    console.log("[Seed] Creating bookings...")
    const sampleBookings = [
      { movieIdx: 0, showIdx: 3, seats: ["B5", "B6", "B7"], status: "Confirmed" },
      { movieIdx: 1, showIdx: 8, seats: ["E2", "E3"], status: "Confirmed" },
      { movieIdx: 3, showIdx: 14, seats: ["C1", "C2", "C3", "C4"], status: "Pending" },
      { movieIdx: 4, showIdx: 19, seats: ["H8"], status: "Confirmed" },
      { movieIdx: 2, showIdx: 11, seats: ["F4", "F5"], status: "Cancelled" },
    ]

    for (const b of sampleBookings) {
      const movieShows = allShows.filter(
        (s) => s.movie.toString() === movies[b.movieIdx]._id.toString()
      )
      const show = movieShows[b.showIdx % movieShows.length]
      if (!show) continue

      await Booking.create({
        user: demoUser._id,
        show: show._id,
        movie: movies[b.movieIdx]._id,
        seats: b.seats,
        amount: b.seats.length * show.price + 35,
        status: b.status,
      })
    }
    console.log("[Seed] 5 sample bookings created.")

    console.log("\n✅ Seed complete! You can now run: npm run dev")
    process.exit(0)
  } catch (err) {
    console.error("[Seed] Error:", err)
    process.exit(1)
  }
}

seed()
