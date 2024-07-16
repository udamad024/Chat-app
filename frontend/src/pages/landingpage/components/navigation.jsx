import React from "react";
import { useNavigate } from 'react-router-dom';

// const navigateTo = useNavigate();

//   const handleSignupClick = () => {
//     navigateTo('/login')
//   };

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Collabor8
          </a>{" "}
        </div>

        <div className="navigation-bar collapse navbar-collapse" id="bs-example-navbar-collapse-1" >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              {/* <a href="#contact" className="page-scroll" onClick={handleSignupClick}> */}
              <a href="#contact" className="page-scroll">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
