import Reac, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admin.scss";
import { fetchCompanies } from "../../components/Services/userAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectCompany = (props) => {
  // console.log("PROPS", props);

  const [company, setCompany] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(props.selectedCompany);
  }, [props.selectedCompany]);

  useEffect(() => {
    async function fetchCompany() {
      const data = await fetchCompanies();
      setCompany(data);
      // console.log("companies data", data);
    }

    fetchCompany();
  }, []);
  console.log("companies", company);
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
          <>
            <button className="btn btn-outline-secondary report-button">
              <Link to="/admin/select_candidate">1. Select Candidate</Link>
            </button>
            <button className="btn btn-outline-secondary report-button emphasize">
              <Link to="/admin/select_company">2. Select Company</Link>
            </button>
            <button className="btn btn-outline-secondary report-button">
              <Link to="/admin/fill_details">3. Fill Report Details</Link>
            </button>
          </>
          <div className="selectedInfo">
            <h5>Candidate:</h5>
            <h4>{props.selectedCandidate}</h4>
          </div>
        </div>
        <div className="div-right">
          <div className="select-candidate">
            <>
              {company.length > 0 &&
                company.map((item) => (
                  <div
                    className={` select-company-list hoverable ${
                      selected == item.name ? "active" : null
                    }`}
                    onClick={() => {
                      props.funcCompany(item.name);
                      props.funcCompanyId(item.id);
                    }}
                  >
                    <h4>{item.name}</h4>
                  </div>
                ))}
            </>
          </div>
          <button className="btn btn-outline-one">
            <Link to="/admin/select_candidate">BACK</Link>
          </button>
          <button className="btn btn-outline-one">
            <Link to="/admin/fill_details">NEXT</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectCompany;
