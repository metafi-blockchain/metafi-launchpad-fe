import React from "react";
import "./index.scss";

const MFProjectsBanner = () => {
    return <section className="mf-banner">
    <div className="mf-banner-image">
      <img src="images/banner.png" alt="" />
    </div>
    <div className="mf-banner-inner">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-5 pe-xl-0 mb-4 mb-lg-0">
            <h1>WELCOME TO THE <br />SOLAV LAUNCHPAD</h1>
            <p>
              Solav Launchpads is your ticket to diversify your DeFi
              investment Portfolio & access the best crypto projects.
            </p>
            <div className="mf-banner-stats">
              <div className="row">
                <div className="col-sm-3 col-6">
                  <b>3</b>
                  <span>Opening <br />Launchpads</span>
                </div>
                <div className="col-sm-3 col-6">
                  <b>9</b>
                  <span>Closed <br />Launchpads</span>
                </div>
                <div className="col-sm-3 col-6">
                  <b>0</b>
                  <span>Upcoming <br />Launchpads</span>
                </div>
                <div className="col-sm-3 col-6">
                  <b>14.4M</b>
                  <span>Fund <br />Raised</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
export default MFProjectsBanner