import { apiUrl, useApiList } from '../api.js'
import ResourceStatus from './ResourceStatus.jsx'

const fetchLeaderboard = (signal) => fetch(apiUrl('/api/leaderboard/'), { signal })

function Leaderboard() {
  const { items, loading, error } = useApiList(fetchLeaderboard)
  const status = <ResourceStatus loading={loading} error={error} empty={!items.length} label="leaderboard entries" />

  return (
    <section>
      <h1 className="h2 mb-4">Leaderboard</h1>
      {loading || error || !items.length ? status : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((entry) => (
                <tr key={entry._id ?? entry.id}>
                  <td>{entry.rank}</td>
                  <td>{entry.user?.name ?? entry.user}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
