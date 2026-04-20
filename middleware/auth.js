// Authentication & authorization middleware

export function setLocals(req, res, next) {
// Make current user available in all EJS views
  res.locals.currentUser = req.session?.user || null
  res.locals.currentPath = req.path
  res.locals.isAdmin = req.path.startsWith("/admin")
  next()
}

export function isLoggedIn(req, res, next) {
  if (req.session?.user) return next()
  res.redirect("/login")
}

export function isAdmin(req, res, next) {
  if (req.session?.user?.role === "admin") return next()
  res.redirect("/login")
}
