import React from "react";
import { Link } from "react-router-dom";

const NoPageAdmin = () => {
  return (
    <>
      <div className="container cont">
        <div className="column">
          <div className="col-xl-5 lg-6">
            <h1>Reports Administration</h1>
          </div>
          <div className="col-xl-7 lg-6 text-xl-start sm-12">
            <div className="container-fluid">
              <button className="btn btn-outline">
                <Link to="/">Interviews Reports</Link>
              </button>

              <button className="btn btn-outline">
                <Link to="/admin/reports">Reports</Link>
              </button>

              <button className="btn btn-outline">
                <Link to="/admin/select_candidate">Create Report</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="xs-12 md-6 mx-auto">
            <div id="countUp">
              <div class="number">404</div>
              <div class="text">Page Not Found</div>
              <div class="text">This may not mean anything.</div>
              <Link to="/admin/select_candidate" className="btn homeBtn">
                GO HOME
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPageAdmin;
