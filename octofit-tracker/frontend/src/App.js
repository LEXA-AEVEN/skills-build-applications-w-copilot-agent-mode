import React from 'react';
import logoSmall from './assets/octofitapp-small.svg';
import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand octo-logo-brand">
            <img src={logoSmall} alt="OctoFit logo" />
            <span>OctoFit Tracker</span>
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/activities" className={linkClass}>Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className={linkClass}>Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/users" className={linkClass}>Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/workouts" className={linkClass}>Workouts</NavLink>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" id="manageDropdown" data-bs-toggle="dropdown" aria-expanded="false" type="button">
                  Manage
                </button>
                <ul className="dropdown-menu" aria-labelledby="manageDropdown">
                  <li><span className="dropdown-item disabled">Create Activity (soon)</span></li>
                  <li><span className="dropdown-item disabled">Create Team (soon)</span></li>
                </ul>
              </li>
            </ul>
            <span className="navbar-text small text-muted">Fitness dashboard</span>
          </div>
        </div>
      </nav>
      <div className="pb-4">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
