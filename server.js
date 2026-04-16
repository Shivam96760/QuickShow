import "dotenv/config"
import express from "express"
import expressLayouts from "express-ejs-layouts"
import session from "express-session"
import MongoStore from "connect-mongo"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./config/db.js"
import { setLocals } from "./middleware/auth.js"

import authRoutes from "./routes/auth.js"
import publicRoutes from "./routes/public.js"
import adminRoutes from "./routes/admin.js"
import apiRoutes from "./routes/api.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// ---------- Connect MongoDB ----------
await connectDB()

// ---------- View engine ----------
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.set("layout", "layouts/main")
app.use(expressLayouts)

// ---------- Middleware ----------
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ---------- Sessions ----------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "quickshow-fallback-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    },
  })
)

// ---------- Global locals ----------
app.use(setLocals)

// ---------- Routes ----------
app.use("/", authRoutes)
app.use("/", publicRoutes)
app.use("/admin", adminRoutes)
app.use("/api", apiRoutes)

// ---------- 404 ----------
app.use(async (req, res) => {
  try {
    const Movie = (await import("./models/Movie.js")).default
    const rawMovies = await Movie.find().limit(8).lean()
    const movies = rawMovies.map((m) => ({ ...m, id: m.slug }))
    const featured = movies[0] || null
    if (!featured) {
      return res.status(404).send("Page not found. Seed the database first: npm run seed")
    }
    res.status(404).render("pages/home", {
      title: "QuickShow",
      featured,
      movies,
    })
  } catch (err) {
    console.error("[404] Error:", err)
    res.status(404).send("Page not found")
  }
})

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`[QuickShow] Server running at http://localhost:${PORT}`)
})
