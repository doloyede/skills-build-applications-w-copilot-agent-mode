import { apiUrl, useApiList } from '../api.js'
import ResourceStatus from './ResourceStatus.jsx'

const fetchTeams = (signal) => fetch(apiUrl('/api/teams/'), { signal })

function Teams() {
  const { items, loading, error } = useApiList(fetchTeams)
  const status = <ResourceStatus loading={loading} error={error} empty={!items.length} label="teams" />

  return (
    <section>
      <h1 className="h2 mb-4">Teams</h1>
      {loading || error || !items.length ? status : (
        <div className="row g-3">
          {items.map((team) => (
            <div className="col-md-6" key={team._id ?? team.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="h5 card-title">{team.name}</h2>
                  <p className="card-text text-secondary mb-0">
                    {team.members?.length
                      ? team.members.map((member) => member?.name ?? member).join(', ')
                      : 'No members yet'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
