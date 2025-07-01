const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

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

export default {
  listStudents,
  createStudents,
  deleteStudent,
  getStudent,
}
