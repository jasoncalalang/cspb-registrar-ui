// When running the dev server Vite proxies API requests to avoid CORS
// problems. The base URL can be overridden via VITE_API_BASE_URL if needed.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const listStudents = async (page = 0, size = 5, signal) => {
  const res = await fetch(
    `${BASE_URL}/api/students?page=${page}&size=${size}`,
    { signal }
  )
  return res.json()
}

const createStudents = async (students, signal) => {
  const res = await fetch(`${BASE_URL}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(students),
    signal,
  })
  return res.json()
}

const deleteStudent = async (id, signal) => {
  await fetch(`${BASE_URL}/api/students/${id}`, { method: 'DELETE', signal })
}

const getStudent = async (id, signal) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`, { signal })
  return res.json()
}

const getStudentAddress = async (id, signal) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}/address`, { signal })
  return res.json()
}

export default {
  listStudents,
  createStudents,
  deleteStudent,
  getStudent,
  getStudentAddress,
}
