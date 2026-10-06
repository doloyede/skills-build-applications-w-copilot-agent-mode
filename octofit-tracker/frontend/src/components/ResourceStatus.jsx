function ResourceStatus({ loading, error, empty, label }) {
  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 text-secondary">
        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
        Loading {label}...
      </div>
    )
  }
  if (error) {
    return <div className="alert alert-danger mb-0">Could not load {label}: {error}</div>
  }
  if (empty) {
    return <div className="alert alert-secondary mb-0">No {label} found.</div>
  }
  return null
}

export default ResourceStatus
