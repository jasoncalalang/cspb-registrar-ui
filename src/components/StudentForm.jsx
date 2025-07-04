"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api.js"
const loadingGif = "https://i.gifer.com/YCZH.gif"

const initialStudent = {
  id: undefined,
  lrn: "",
  lastName: "",
  firstName: "",
  middleName: "",
  extensionName: "",
  birthDate: "",
  birthPlace: "",
  gender: "",
  nationality: "",
  religion: "",
  numSiblings: 0,
  siblingNames: "",
  imgPath: "",
  address: {
    houseNo: "",
    streetSubd: "",
    bgyCode: "",
  },
}

function StudentForm() {
  const [student, setStudent] = useState(initialStudent)
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setStudent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setStudent((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus("")
    setLoading(true)
    api
      .createStudents([student])
      .then(() => {
        navigate("/", { state: { toast: "student is created" } })
      })
      .catch(() => setStatus("Error"))
      .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Create Student</h2>

      <div className="mb-3">
        <input name="lrn" className="form-control" placeholder="LRN" value={student.lrn} onChange={handleChange} />
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
          <select name="gender" className="form-select" value={student.gender} onChange={handleChange}>
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

      <h5>Address</h5>
      <div className="row mb-3">
        <div className="col">
          <input
            name="houseNo"
            className="form-control"
            placeholder="House No"
            value={student.address.houseNo}
            onChange={handleAddressChange}
          />
        </div>
        <div className="col">
          <input
            name="streetSubd"
            className="form-control"
            placeholder="Street/Subdivision"
            value={student.address.streetSubd}
            onChange={handleAddressChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <input
          name="bgyCode"
          className="form-control"
          placeholder="Barangay Code"
          value={student.address.bgyCode}
          onChange={handleAddressChange}
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

      <button type="submit" className="btn text-white" disabled={loading} style={{ backgroundColor: "#2F5249" }}>
        {loading ? <img src={loadingGif || "/placeholder.svg"} alt="Loading..." width="20" /> : "Submit"}
      </button>
      {status && <span className="ms-2">{status}</span>}
    </form>
  )
}

export default StudentForm
