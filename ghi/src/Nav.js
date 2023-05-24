import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <li className="nav-item active">
            <a className="nav-link" href="/">Homepage</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/journals">Entries</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/messages">Messages</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/appointments">Appointments</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/resources">Resources</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
