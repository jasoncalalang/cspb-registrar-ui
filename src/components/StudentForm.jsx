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

      <div className="mb-3">
        <input
          name="lrn"
          className="form-control"
          placeholder="LRN"
          value={student.lrn}
          onChange={handleChange}
        />
      </div>

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
            name="middleName"
            className="form-control"
            placeholder="Middle Name"
            value={student.middleName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
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
        <div className="col">
          <input
            name="extensionName"
            className="form-control"
            placeholder="Extension Name"
            value={student.extensionName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="date"
            name="birthDate"
            className="form-control"
            placeholder="Birth Date"
            value={student.birthDate}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            name="birthPlace"
            className="form-control"
            placeholder="Birth Place"
            value={student.birthPlace}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <select
            name="gender"
            className="form-select"
            value={student.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="col">
          <input
            name="nationality"
            className="form-control"
            placeholder="Nationality"
            value={student.nationality}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            name="religion"
            className="form-control"
            placeholder="Religion"
            value={student.religion}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            type="number"
            name="numSiblings"
            className="form-control"
            placeholder="Number of Siblings"
            value={student.numSiblings}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <input
          name="siblingNames"
          className="form-control"
          placeholder="Sibling Names"
          value={student.siblingNames}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          name="imgPath"
          className="form-control"
          placeholder="Image URL"
          value={student.imgPath}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      {status && <span className="ms-2">{status}</span>}
    </form>
  )
}

export default StudentForm
