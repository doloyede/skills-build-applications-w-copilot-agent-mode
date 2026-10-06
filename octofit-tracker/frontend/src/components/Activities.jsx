import { apiUrl, useApiList } from '../api.js'
import ResourceStatus from './ResourceStatus.jsx'

const fetchActivities = (signal) => fetch(apiUrl('/api/activities/'), { signal })

function Activities() {
  const { items, loading, error } = useApiList(fetchActivities)
  const status = <ResourceStatus loading={loading} error={error} empty={!items.length} label="activities" />

  return (
    <section>
      <h1 className="h2 mb-4">Activities</h1>
      {loading || error || !items.length ? status : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id ?? activity.id}>
                  <td>{activity.user?.name ?? activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
