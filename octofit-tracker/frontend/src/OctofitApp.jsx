import { NavLink, Route, Routes } from 'react-router-dom'

const sections = ['Overview', 'Activities', 'Teams', 'Leaderboard', 'Workouts']

function OctofitApp() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="navbar navbar-expand bg-white border-bottom">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-3">
            {sections.map((section) => (
              <NavLink
                className="nav-link"
                end={section === 'Overview'}
                key={section}
                to={section === 'Overview' ? '/' : `/${section.toLowerCase()}`}
              >
                {section}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Section title="Overview" />} />
          {sections.slice(1).map((section) => (
            <Route
              element={<Section title={section} />}
              key={section}
              path={`/${section.toLowerCase()}`}
            />
          ))}
          <Route path="*" element={<Section title="Overview" />} />
        </Routes>
      </main>
    </div>
  )
}

function Section({ title }) {
  return <h1 className="h2 mb-0">{title}</h1>
}

export default OctofitApp