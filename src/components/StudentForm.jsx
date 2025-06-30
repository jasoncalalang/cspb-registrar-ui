import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

const initialStudent = {
  id: undefined,
  lrn: '',
  lastName: '',
  firstName: '',
  middleName: '',
  extensionName: '',
  birthDate: '',
  birthPlace: '',
  gender: '',
  nationality: '',
  religion: '',
  numSiblings: 0,
  siblingNames: '',
  imgPath: '',
}

function StudentForm() {
  const [student, setStudent] = useState(initialStudent)
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setStudent((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('')
    api
      .createStudents([student])
      .then(() => {
        navigate('/', { state: { toast: 'student is created' } })
      })
      .catch(() => setStatus('Error'))
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Create Student</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            name="firstName"
            className="form-control"
            placeholder="First Name"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <input
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      {status && <span className="ms-2">{status}</span>}
    </form>
  )
}

export default StudentForm
