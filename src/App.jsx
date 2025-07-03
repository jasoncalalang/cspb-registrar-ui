import { BrowserRouter as Router } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import AppRoutes from "./routes.jsx"
import "./App.css"

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  )
}

export default App
