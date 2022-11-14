import React from "react";
import { NavLink } from "react-bootstrap";
import Menu from "./Menu.js";
import New from "../src1/New.js";

const Navbar = () => {
  return (
    <div>
      <div>
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            {/* <h5 class="text-white h4"><Drop_signup /></h5> */}
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="nav-link">
                <Menu />
              </NavLink>
            </li>

            {/* <span class="text-muted">Toggleable via the navbar brand.</span> */}
          </div>
        </div>
        <nav class="navbar navbar-dark bg-dark">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/d9/Shahjalal_University_of_Science_and_Technology_logo.png"
              alt="Bootstrap"
              width="30"
              height="24"
            />
            IICT Library
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  href="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="nav-link"
                  href="/new"
                >
                  Login
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link " aria-current="nav-link" href="/signup">Signup</NavLink>

        
              </li> */}
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="nav-link"
                  href="/signup"
                >
                  {" "}
                  signUp
                </NavLink>
              </li>

              {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Link
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" href='/AboutUs'>About-Us</NavLink>
              </li> */}
            </ul>
            {/* <div class="row">
              <div class="col">
                <div id="opac-main-search" class="mastheadsearch">
                  <form
                    name="searchform"
                    method="get"
                    action="/cgi-bin/koha/opac-search.pl"
                    id="searchform"
                  >
                    <div class="form-row align-items-center">
                      <div class="col-sm-auto order-2 order-sm-2">
                        <select
                          name="idx"
                          id="masthead_search"
                          class="form-control"
                        >
                          <option value="">Library catalog</option>

                          <option value="ti">Title</option>

                          <option value="au">Author</option>

                          <option value="su">Subject</option>

                          <option value="nb">ISBN</option>

                          <span id="translControl"></span>
                          <option value="ns">ISSN</option>

                          <option value="se">Series</option>
                        </select>
                      </div>

                      <div class="col order-20 order-sm-20">
                        <input
                          type="text"
                          class="transl1 form-control"
                          id="translControl1"
                          name="q"
                          value=""
                        />
                      </div>

                      <div class="order-5 col-sm-auto">
                        <button
                          type="submit"
                          id="searchsubmit"
                          class="btn btn-primary"
                          title="Search"
                          aria-label="Search"
                        >
                          Search
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    <input type="hidden" name="weight_search" value="1" />
                  </form>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
