"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faUsers, faUserPlus, faDashboard, faGraduationCap } from "@fortawesome/free-solid-svg-icons"

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const isActive = (path) => location.pathname === path

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: "#2F5249" }}>
        <div className="container-fluid">
          <button
            className="btn btn-outline-light me-3 d-lg-none"
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <Link className="navbar-brand d-flex align-items-center" to="/">
            <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
            Student Registrar System
          </Link>

          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#settings">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#logout">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow-1 d-flex">
        {/* Left Sidebar */}
        <div
          className={`bg-light border-end ${sidebarOpen ? "d-block" : "d-none d-lg-block"}`}
          style={{ width: "250px", minHeight: "100%" }}
        >
          <div className="p-3">
            <h6 className="text-muted text-uppercase fw-bold mb-3">Navigation</h6>
            <nav className="nav flex-column">
              <Link
                className={`nav-link d-flex align-items-center py-2 ${isActive("/") ? "active text-white rounded" : "text-dark"}`}
                to="/"
                onClick={() => setSidebarOpen(false)}
                style={isActive("/") ? { backgroundColor: "#2F5249" } : {}}
              >
                <FontAwesomeIcon icon={faDashboard} className="me-2" />
                Dashboard
              </Link>
              <Link
                className={`nav-link d-flex align-items-center py-2 ${isActive("/students") ? "active text-white rounded" : "text-dark"}`}
                to="/"
                onClick={() => setSidebarOpen(false)}
                style={isActive("/students") ? { backgroundColor: "#2F5249" } : {}}
              >
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                All Students
              </Link>
              <Link
                className={`nav-link d-flex align-items-center py-2 ${isActive("/students/new") ? "active text-white rounded" : "text-dark"}`}
                to="/students/new"
                onClick={() => setSidebarOpen(false)}
                style={isActive("/students/new") ? { backgroundColor: "#2F5249" } : {}}
              >
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Add Student
              </Link>
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
            style={{ zIndex: 1040 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-grow-1 p-4">{children}</div>
      </div>
    </div>
  )
}

export default Layout
