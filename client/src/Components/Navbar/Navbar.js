import React from "react";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { logout } from "../../http/ApiService";
import {onLogout} from "../../store-handlers";

function Navbar() {
  const isLogged = useStoreState((state) => state.isLogged);
  const history = useHistory();
  const logoutUser = () => {
    async function logoutCall() {
      let result = await logout();
      if (result.status === 200) {
        onLogout();
        history.push("/login");
      }
    }
    logoutCall();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid ">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between mx-auto"
          id="navbarSupportedContent"
        >
          <div
            className="d-flex flex-column flex-lg-row py-lg-3 navbar justify-content-between mx-auto"
            style={{ width: "80%" }}
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <div>
              {!isLogged ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link logout nav-link" onClick={logoutUser}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
