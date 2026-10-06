import { apiUrl, useApiList } from '../api.js'
import ResourceStatus from './ResourceStatus.jsx'

const fetchUsers = (signal) => fetch(apiUrl('/api/users/'), { signal })

function Users() {
  const { items, loading, error } = useApiList(fetchUsers)
  const status = <ResourceStatus loading={loading} error={error} empty={!items.length} label="users" />

  return (
    <section>
      <h1 className="h2 mb-4">Users</h1>
      {loading || error || !items.length ? status : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Fitness goal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.profile?.age ?? '-'}</td>
                  <td>{user.profile?.fitnessGoal ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
