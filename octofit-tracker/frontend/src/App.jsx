import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { API_BASE_URL } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { path: 'activities', label: 'Activities' },
  { path: 'leaderboard', label: 'Leaderboard' },
  { path: 'teams', label: 'Teams' },
  { path: 'users', label: 'Users' },
  { path: 'workouts', label: 'Workouts' },
]

function Home() {
  return (
    <section>
      <h1 className="h2 mb-3">Welcome to OctoFit Tracker</h1>
      <p className="text-secondary">
        API: <code>{API_BASE_URL}</code>
      </p>
      <div className="d-flex flex-wrap gap-2">
        {sections.map(({ path, label }) => (
          <Link className="btn btn-outline-primary" key={path} to={`/${path}`}>
            {label}
          </Link>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary text-start">
      <header className="navbar navbar-expand bg-white border-bottom">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-3">
            {sections.map(({ path, label }) => (
              <NavLink className="nav-link" key={path} to={`/${path}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
