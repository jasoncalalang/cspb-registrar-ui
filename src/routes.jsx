import { Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard.jsx"
import StudentForm from "./components/StudentForm.jsx"
import StudentDetails from "./components/StudentDetails.jsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students/new" element={<StudentForm />} />
      <Route path="/students/:id" element={<StudentDetails />} />
    </Routes>
  )
}

export default AppRoutes
