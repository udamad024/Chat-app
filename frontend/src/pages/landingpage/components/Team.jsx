import React from "react";

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-12 section-title">
          <h2>Team PROSPR</h2>
        </div>
        <div class="container">
        <div id="row" className="team-images row justify-content-center">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-2 col-sm-4 col-xs-6">
                  <div className="thumbnail">
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
        </div>
      </div>
    </div>
  );
};
