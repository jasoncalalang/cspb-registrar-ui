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
      {student.imgPath && <img src={student.imgPath} alt="" width="150" />}
      <p>ID: {student.id}</p>
      <p>LRN: {student.lrn}</p>
      <p>Last Name: {student.lastName}</p>
      <p>First Name: {student.firstName}</p>
      <p>Middle Name: {student.middleName}</p>
      <p>Extension Name: {student.extensionName}</p>
      <p>Birth Date: {student.birthDate}</p>
      <p>Birth Place: {student.birthPlace}</p>
      <p>Gender: {student.gender}</p>
      <p>Nationality: {student.nationality}</p>
      <p>Religion: {student.religion}</p>
      <p>Number of Siblings: {student.numSiblings}</p>
      <p>Sibling Names: {student.siblingNames}</p>
      <p>Created At: {new Date(student.createdAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
      })}</p>
      <p>Updated At: {new Date(student.updatedAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
      })}</p>
      <Link to="/">Back</Link>
    </div>
  )
}

export default StudentDetails
