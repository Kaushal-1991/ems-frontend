import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark mb-4 navbar-expand-lg">
        <a className="navbar-brand ps-3" href="#">Employee Management System</a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/employees">
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/departments">
                Departments
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default HeaderComponent
