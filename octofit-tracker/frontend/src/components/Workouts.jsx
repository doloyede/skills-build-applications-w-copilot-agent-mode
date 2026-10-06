import { apiUrl, useApiList } from '../api.js'
import ResourceStatus from './ResourceStatus.jsx'

const fetchWorkouts = (signal) => fetch(apiUrl('/api/workouts/'), { signal })

function Workouts() {
  const { items, loading, error } = useApiList(fetchWorkouts)
  const status = <ResourceStatus loading={loading} error={error} empty={!items.length} label="workouts" />

  return (
    <section>
      <h1 className="h2 mb-4">Workouts</h1>
      {loading || error || !items.length ? status : (
        <div className="row g-3">
          {items.map((workout) => (
            <div className="col-md-6 col-lg-4" key={workout._id ?? workout.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="h5 card-title">{workout.name}</h2>
                  <p className="card-text">{workout.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between small text-secondary">
                  <span className="text-capitalize">{workout.difficulty}</span>
                  <span>{workout.durationMinutes} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
