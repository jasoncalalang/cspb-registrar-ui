import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import api from '../services/api.js'
const loadingGif = 'https://i.gifer.com/YCZH.gif'

function StudentList() {
  const [students, setStudents] = useState([])
  const [page, setPage] = useState(0)
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const pageSize = 5

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    api
      .listStudents(page, pageSize, controller.signal)
      .then((data) => setStudents(data.content ?? data))
      .catch(() => {})
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [page])

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast)
      navigate('.', { replace: true, state: null })
      setTimeout(() => setToast(''), 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  const handleDelete = async (id) => {
    try {
      await api.deleteStudent(id)
      setStudents((prev) => prev.filter((s) => s.id !== id))
      setToast('user is deleted')
      setTimeout(() => setToast(''), 3000)
    } catch {
      // ignore
    }
  }

  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(0, p - 1))

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="m-0">Students</h2>
        <Link className="btn btn-primary" to="/students/new">
          New Student
        </Link>
      </div>
      {toast && (
        <div className="toast show position-fixed top-0 end-0 m-3" role="alert">
          <div className="toast-body">{toast}</div>
        </div>
      )}
      {loading ? (
        <div className="text-center my-5">
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>LRN</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <Link to={`/students/${s.id}`}>{s.id}</Link>
                  </td>
                  <td>{s.lrn}</td>
                  <td>{s.lastName}</td>
                  <td>{s.firstName}</td>
                  <td>{s.middleName}</td>
                  <td>{s.imgPath && <img src={s.imgPath} alt="" width="50" />}</td>
                  <td>
                    <button
                      aria-label={`delete-${s.id}`}
                      className="btn btn-link text-danger"
                      onClick={() => handleDelete(s.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={prevPage} disabled={page === 0}>
              Previous
            </button>
            <span>Page {page}</span>
            <button className="btn btn-secondary" onClick={nextPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default StudentList
