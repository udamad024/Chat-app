import React from "react";

export const About = (props) => {
  return (
    <div id="about" className="text-center">
      <div className="container">
        <div className="row">
        <div className="col-md-12 section-title">
          <h2>About US</h2>
        </div>
          <div className="col-xs-12 col-md-4">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-8">
            <div className="about-text">
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
