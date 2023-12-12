import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from '../auth'


const LoggedInLinks=()=> {
    return (
        <>
        <li className="nav-item active">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/sneaker">
              Sneakers
            </Link>
          </li>
          
        <li className="nav-item">
            <Link className="nav-link active">
              Log Out
            </Link>
          </li>
        </>
    )
}

const LoggedOutLinks=()=> {
    return (
        <>
        <li className="nav-item">
            <Link className="nav-link active" to="/signup" >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/login">
              Login
            </Link>
          </li>
        </>
    )
}
const NavBar = () => {

    const [logged]=useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        ShoeHaven
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
                        {logged?<LoggedInLinks/>:<LoggedOutLinks/>}
                    </ul>
      </div>
    </nav>
  );
};

export default NavBar