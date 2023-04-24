import React from "react";
import "./NoPage.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const NoPage = () => {
  return (
    <>
      <Header />
      <div class="container">
        <div class="row">
          <div class="xs-12 md-6 mx-auto">
            <div id="countUp">
              <div class="number">404</div>
              <div class="text">Page Not Found</div>
              <div class="text">This may not mean anything.</div>
              <Link to="/" className="btn homeBtn">
                GO HOME
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;
