import { Routes, Route } from 'react-router-dom'
import StudentList from './components/StudentList.jsx'
import StudentForm from './components/StudentForm.jsx'
import StudentDetails from './components/StudentDetails.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/students/new" element={<StudentForm />} />
      <Route path="/students/:id" element={<StudentDetails />} />
    </Routes>
  )
}

export default AppRoutes
