// Mock data representing what a real backend would pass to the EJS views.

export const movies = [
  {
    id: "inception",
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: "2h 28m",
    rating: 8.8,
    year: 2010,
    poster:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailer: "YoHD9XEInc0",
    casts: [
      { name: "Leonardo DiCaprio", image: "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
      { name: "Joseph Gordon-Levitt", image: "https://image.tmdb.org/t/p/w185/4U9G4YwTlIEbAymBaseltS38eH4.jpg" },
      { name: "Elliot Page", image: "https://image.tmdb.org/t/p/w185/5NvTy0ac2dNEO4GHvVAvZF9O6B3.jpg" },
      { name: "Tom Hardy", image: "https://image.tmdb.org/t/p/w185/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg" },
      { name: "Cillian Murphy", image: "https://image.tmdb.org/t/p/w185/llkbyWKwpfowZ6C8peBjIV9jj99.jpg" },
      { name: "Marion Cotillard", image: "https://image.tmdb.org/t/p/w185/h2bLb8W6zQcgDGAd7Nq4vPOHLLg.jpg" },
    ],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: "2h 49m",
    rating: 8.6,
    year: 2014,
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg",
    trailer: "zSWdZVtXT7E",
    casts: [],
  },
  {
    id: "dark-knight",
    title: "The Dark Knight",
    tagline: "Why so serious?",
    overview:
      "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 32m",
    rating: 9.0,
    year: 2008,
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    trailer: "EXeTwQWrcwY",
    casts: [],
  },
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview:
      "Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    genres: ["Sci-Fi", "Adventure"],
    runtime: "2h 46m",
    rating: 8.5,
    year: 2024,
    poster:
      "https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    trailer: "Way9Dexny3w",
    casts: [],
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    overview:
      "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    genres: ["Drama", "History"],
    runtime: "3h 0m",
    rating: 8.3,
    year: 2023,
    poster:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    trailer: "uYPbbksJxIg",
    casts: [],
  },
  {
    id: "spider-verse",
    title: "Across the Spider-Verse",
    tagline: "It's how you wear the mask that matters.",
    overview:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    genres: ["Animation", "Action", "Adventure"],
    runtime: "2h 20m",
    rating: 8.6,
    year: 2023,
    poster:
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    trailer: "cqGjhVJWtEg",
    casts: [],
  },
  {
    id: "joker",
    title: "Joker",
    tagline: "Put on a happy face.",
    overview:
      "In Gotham City, mentally troubled comedian Arthur Fleck embarks on a downward spiral.",
    genres: ["Crime", "Drama", "Thriller"],
    runtime: "2h 2m",
    rating: 8.4,
    year: 2019,
    poster:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    trailer: "zAGVQLHvwOY",
    casts: [],
  },
  {
    id: "avatar-way-of-water",
    title: "Avatar: The Way of Water",
    tagline: "Return to Pandora.",
    overview:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    genres: ["Sci-Fi", "Adventure"],
    runtime: "3h 12m",
    rating: 7.6,
    year: 2022,
    poster:
      "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    trailer: "d9MyW72ELq0",
    casts: [],
  },
]

// Give all movies default casts if empty (so movie-details loops always have data)
movies.forEach((m) => {
  if (!m.casts || m.casts.length === 0) {
    m.casts = movies[0].casts
  }
})

const today = new Date()
const dayLabel = (offset) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offset)
  return {
    key: d.toISOString().slice(0, 10),
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  }
}

export const shows = {
  default: [
    { ...dayLabel(0), times: ["10:30 AM", "1:45 PM", "4:30 PM", "7:30 PM", "10:15 PM"] },
    { ...dayLabel(1), times: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"] },
    { ...dayLabel(2), times: ["12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"] },
    { ...dayLabel(3), times: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:30 PM"] },
    { ...dayLabel(4), times: ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"] },
  ],
}

export const bookings = [
  {
    id: "BK-00142",
    user: "Rahul Sharma",
    movie: movies[0],
    date: "Sat, 20 Apr · 7:30 PM",
    seats: ["B5", "B6", "B7"],
    amount: 750,
    status: "Confirmed",
  },
  {
    id: "BK-00138",
    user: "Priya Singh",
    movie: movies[1],
    date: "Fri, 19 Apr · 9:15 PM",
    seats: ["E2", "E3"],
    amount: 500,
    status: "Confirmed",
  },
  {
    id: "BK-00129",
    user: "Arjun Verma",
    movie: movies[3],
    date: "Thu, 18 Apr · 6:00 PM",
    seats: ["C1", "C2", "C3", "C4"],
    amount: 1000,
    status: "Pending",
  },
  {
    id: "BK-00111",
    user: "Sneha Reddy",
    movie: movies[4],
    date: "Wed, 17 Apr · 10:30 PM",
    seats: ["H8"],
    amount: 250,
    status: "Confirmed",
  },
  {
    id: "BK-00098",
    user: "Aman Khan",
    movie: movies[2],
    date: "Tue, 16 Apr · 7:45 PM",
    seats: ["F4", "F5"],
    amount: 600,
    status: "Cancelled",
  },
]

export const stats = {
  movies: movies.length,
  shows: 34,
  bookings: 1287,
  revenue: 324750,
}
