/* QuickShow — shared vanilla JS */

;(function () {
  const FAV_KEY = "quickshow:favorites"

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || "[]")
    } catch (err) {
      console.log("[v0] favorites parse error", err)
      return []
    }
  }

  function setFavorites(list) {
    localStorage.setItem(FAV_KEY, JSON.stringify(list))
  }

  function applyFavoriteState() {
    const favs = getFavorites()
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      const id = btn.dataset.movieId
      if (favs.includes(id)) {
        btn.classList.add("is-fav")
      } else {
        btn.classList.remove("is-fav")
      }
    })
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".favorite-btn")
    if (!btn) return
    e.preventDefault()
    e.stopPropagation()
    const id = btn.dataset.movieId
    let favs = getFavorites()
    if (favs.includes(id)) {
      favs = favs.filter((x) => x !== id)
    } else {
      favs.push(id)
    }
    setFavorites(favs)
    applyFavoriteState()

    // Favorites page: re-render empty state
    const favGrid = document.getElementById("favorites-grid")
    if (favGrid) {
      const cards = favGrid.querySelectorAll("[data-fav-id]")
      cards.forEach((card) => {
        if (!favs.includes(card.dataset.favId)) {
          card.classList.add("hidden")
        } else {
          card.classList.remove("hidden")
        }
      })
      const emptyState = document.getElementById("favorites-empty")
      if (emptyState) {
        const visible = Array.from(cards).filter((c) => !c.classList.contains("hidden")).length
        emptyState.classList.toggle("hidden", visible > 0)
      }
    }
  })

  document.addEventListener("DOMContentLoaded", applyFavoriteState)

  // Expose for inline scripts
  window.QuickShow = {
    getFavorites,
    setFavorites,
    applyFavoriteState,
  }
})()
