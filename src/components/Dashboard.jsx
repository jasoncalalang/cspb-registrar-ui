"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faUserPlus, faEye, faTrash, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons"
import api from "../services/api.js"

const loadingGif = "https://i.gifer.com/YCZH.gif"

function Dashboard() {
  const [students, setStudents] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [toast, setToast] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredStudents, setFilteredStudents] = useState([])
  const pageSize = 10

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    api
      .listStudents(page, pageSize, controller.signal)
      .then((data) => {
        const studentData = data.content ?? data
        setStudents(Array.isArray(studentData) ? studentData : [])
        setTotalPages(data.totalPages ?? Math.ceil(studentData.length / pageSize))
        setTotalElements(data.totalElements ?? studentData.length)
      })
      .catch(() => {
        setStudents([])
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [page])

  useEffect(() => {
    if (searchTerm) {
      const filtered = students.filter(
        (student) =>
          student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.lrn?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredStudents(filtered)
    } else {
      setFilteredStudents(students)
    }
  }, [students, searchTerm])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return
    }

    try {
      await api.deleteStudent(id)
      setStudents((prev) => prev.filter((s) => s.id !== id))
      setToast("Student deleted successfully")
      setTimeout(() => setToast(""), 3000)
    } catch {
      setToast("Error deleting student")
      setTimeout(() => setToast(""), 3000)
    }
  }

  const nextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1))
  const prevPage = () => setPage((p) => Math.max(0, p - 1))

  return (
    <div>
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 mb-3">Student Dashboard</h1>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="card text-white" style={{ backgroundColor: "#2F5249" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Total Students</h6>
                      <h3 className="mb-0">{totalElements}</h3>
                    </div>
                    <FontAwesomeIcon icon={faUsers} size="2x" className="opacity-75" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-black" style={{ backgroundColor: "#E3DE61" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Active Students</h6>
                      <h3 className="mb-0">{students.length}</h3>
                    </div>
                    <FontAwesomeIcon icon={faUsers} size="2x" className="opacity-75" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white" style={{ backgroundColor: "#2F5249" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Current Page</h6>
                      <h3 className="mb-0">{page + 1}</h3>
                    </div>
                    <FontAwesomeIcon icon={faFilter} size="2x" className="opacity-75" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <Link to="/students/new" className="text-decoration-none">
                <div className="card text-black" style={{ backgroundColor: "#E3DE61" }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="card-title">Add Student</h6>
                        <p className="mb-0">Click to add new</p>
                      </div>
                      <FontAwesomeIcon icon={faUserPlus} size="2x" className="opacity-75" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="toast show position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: 1050 }}>
          <div className="toast-body text-white rounded" style={{ backgroundColor: "#2F5249" }}>
            {toast}
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="card mb-4">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0">All Students</h5>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or LRN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <img src={loadingGif || "/placeholder.svg"} alt="Loading..." width="50" />
              <p className="mt-2">Loading students...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-5">
              <FontAwesomeIcon icon={faUsers} size="3x" className="text-muted mb-3" />
              <h5>No students found</h5>
              <p className="text-muted">
                {searchTerm ? "Try adjusting your search terms" : "Start by adding your first student"}
              </p>
              <Link to="/students/new" className="btn text-white" style={{ backgroundColor: "#2F5249" }}>
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Add First Student
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>LRN</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <Link to={`/students/${student.id}`} className="text-decoration-none">
                            #{student.id}
                          </Link>
                        </td>
                        <td>
                          <span className="badge text-white" style={{ backgroundColor: "#2F5249" }}>
                            {student.lrn || "N/A"}
                          </span>
                        </td>
                        <td>
                          <div>
                            <strong>
                              {student.firstName} {student.lastName}
                            </strong>
                            {student.middleName && <small className="text-muted d-block">{student.middleName}</small>}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${student.gender === "M" ? "text-white" : "text-black"}`}
                            style={{ backgroundColor: student.gender === "M" ? "#2F5249" : "#E3DE61" }}
                          >
                            {student.gender === "M" ? "Male" : student.gender === "F" ? "Female" : "N/A"}
                          </span>
                        </td>
                        <td>
                          {student.imgPath ? (
                            <img
                              src={student.imgPath || "/placeholder.svg"}
                              alt={`${student.firstName} ${student.lastName}`}
                              className="rounded-circle"
                              width="40"
                              height="40"
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white"
                              style={{ width: "40px", height: "40px" }}
                            >
                              {student.firstName?.[0]}
                              {student.lastName?.[0]}
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link
                              to={`/students/${student.id}`}
                              className="btn btn-sm btn-outline-primary"
                              title="View Details"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(student.id)}
                              title="Delete Student"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="d-md-none">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="card mb-3">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-3">
                          {student.imgPath ? (
                            <img
                              src={student.imgPath || "/placeholder.svg"}
                              alt={`${student.firstName} ${student.lastName}`}
                              className="rounded-circle w-100"
                              style={{ aspectRatio: "1", objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white w-100"
                              style={{ aspectRatio: "1" }}
                            >
                              <span className="fw-bold">
                                {student.firstName?.[0]}
                                {student.lastName?.[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <h6 className="mb-1">
                            {student.firstName} {student.lastName}
                          </h6>
                          <small className="text-muted">LRN: {student.lrn || "N/A"}</small>
                          <br />
                          <span
                            className={`badge ${student.gender === "M" ? "text-white" : "text-black"}`}
                            style={{ backgroundColor: student.gender === "M" ? "#2F5249" : "#E3DE61" }}
                          >
                            {student.gender === "M" ? "Male" : student.gender === "F" ? "Female" : "N/A"}
                          </span>
                        </div>
                        <div className="col-3 text-end">
                          <div className="btn-group-vertical" role="group">
                            <Link to={`/students/${student.id}`} className="btn btn-sm btn-outline-primary mb-1">
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(student.id)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <small className="text-muted">
                    Showing {filteredStudents.length} of {totalElements} students
                  </small>
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={prevPage} disabled={page === 0}>
                        Previous
                      </button>
                    </li>
                    <li className="page-item active">
                      <span className="page-link">
                        {page + 1} of {Math.max(1, totalPages)}
                      </span>
                    </li>
                    <li className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={nextPage} disabled={page >= totalPages - 1}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
