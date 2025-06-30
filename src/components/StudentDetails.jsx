import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api.js'

function StudentDetails() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    api
      .getStudent(id, controller.signal)
      .then((data) => setStudent(data))
      .catch(() => {})
    return () => controller.abort()
  }, [id])

  if (!student) return <div>Loading...</div>

  return (
    <div>
      <h2>Student Details</h2>
      <p>ID: {student.id}</p>
      <p>LRN: {student.lrn}</p>
      <p>Last Name: {student.lastName}</p>
      <p>First Name: {student.firstName}</p>
      <p>Middle Name: {student.middleName}</p>
      <Link to="/">Back</Link>
    </div>
  )
}

export default StudentDetails
