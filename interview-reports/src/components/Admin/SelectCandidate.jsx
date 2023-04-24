import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admin.scss";
import { fetchCandidates } from "../../components/Services/userAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectCandidate = (props) => {
  // console.log("PROPS", props);

  const [candidate, setCandidate] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(props.selectedCandidate);
  }, [props.selectedCandidate]);

  useEffect(() => {
    async function fetchCandidate() {
      const data = await fetchCandidates();
      setCandidate(data);
      // console.log("data", data);
    }

    fetchCandidate();
  }, []);
  console.log("candidate", candidate);

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
      <div className="report-container container">
        <div className="div-left">
          <button className="btn btn-outline-secondary report-button emphasize">
            <Link to="/admin/select_candidate">1. Select Candidate</Link>
          </button>
          <button className="btn btn-outline-secondary report-button">
            <Link to="/admin/select_company">2. Select Company</Link>
          </button>
          <button className="btn btn-outline-secondary report-button">
            <Link to="/admin/fill_details">3. Fill Report Details</Link>
          </button>
        </div>
        <div className="div-right">
          <div className="select-candidate">
            <>
              {candidate.length > 0 &&
                candidate.map((item, index) => (
                  <div
                    key={index}
                    className={` hoverable select-candidate-list ${
                      selected == item.name ? "active" : null
                    }`}
                    onClick={() => {
                      props.funcCandidate(item.name);
                      props.funcCandidateId(item.id);
                    }}
                  >
                    <h4>{item.name}</h4>
                    <h5>{item.email}</h5>
                  </div>
                ))}
            </>
          </div>
          <button className="btn btn-outline-one">
            <Link to="/admin/select_company">Next</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectCandidate;
