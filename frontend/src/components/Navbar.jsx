import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="#">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <Link
                className="nav-link active fs-4 active mx-4"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
              {localStorage.getItem("token") ? (
                <Link
                  className="nav-link active fs-4 active mx-4"
                  aria-current="page"
                  to="/"
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="d-flex gap-2">
              {localStorage.getItem("token") ? (<>
                <Link
                    className="btn bg-white text-success mx-1 px-3"
                    to="/login"
                  >
                    My Cart 
                  </Link>
                <div onClick={() => {localStorage.clear()
                  navigate('/')
                  window.location.reload()
                }}
                className="btn bg-danger text-white mx-1 px-3"
              >
                logout
              </div>  
              </>
              ) : (
                <>
                  <Link
                    className="btn bg-white text-success mx-1 px-3"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1 px-3"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
