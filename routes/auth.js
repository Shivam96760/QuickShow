import { Router } from "express"
import User from "../models/User.js"

const router = Router()

//  ---------- Register ----------
router.get("/register", (req, res) => {
  if (req.session?.user) return res.redirect("/")
  res.render("pages/register", {
    title: "Register — QuickShow",
    error: null,
  })
})

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password) {
      return res.render("pages/register", {
        title: "Register — QuickShow",
        error: "All fields are required.",
      })
    }

    if (password !== confirmPassword) {
      return res.render("pages/register", {
        title: "Register — QuickShow",
        error: "Passwords do not match.",
      })
    }

    if (password.length < 6) {
      return res.render("pages/register", {
        title: "Register — QuickShow",
        error: "Password must be at least 6 characters.",
      })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.render("pages/register", {
        title: "Register — QuickShow",
        error: "Email already registered.",
      })
    }

    await User.create({ name, email, password })
    res.redirect("/login?registered=1")
  } catch (err) {
    console.error("[Auth] Register error:", err)
    res.render("pages/register", {
      title: "Register — QuickShow",
      error: "Something went wrong. Try again.",
    })
  }
})

// ---------- Login ----------
router.get("/login", (req, res) => {
  if (req.session?.user) return res.redirect("/")
  res.render("pages/login", {
    title: "Login — QuickShow",
    error: null,
    success: req.query.registered ? "Account created! Please sign in." : null,
  })
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.render("pages/login", {
        title: "Login — QuickShow",
        error: "Please fill in all fields.",
        success: null,
      })
    }

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.render("pages/login", {
        title: "Login — QuickShow",
        error: "Invalid email or password.",
        success: null,
      })
    }

    // Store user info in session (not the full document)
    req.session.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }

    // Redirect admin to admin panel
    if (user.role === "admin") return res.redirect("/admin")
    res.redirect("/")
  } catch (err) {
    console.error("[Auth] Login error:", err)
    res.render("pages/login", {
      title: "Login — QuickShow",
      error: "Something went wrong. Try again.",
      success: null,
    })
  }
})

// ---------- Logout ----------
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
})

export default router
