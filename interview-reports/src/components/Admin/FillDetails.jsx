import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postReport } from "../Services/adminAPI";
import "./admin.scss";

const FillDetails = (props) => {
  console.log("PROPS", props);

  const [submitData, setSubmitData] = useState({
    candidateId: 0,
    candidateName: "",
    companyId: 0,
    companyName: "",
    interviewDate: new Date().toString(),
    note: "",
    phase: "cv",
    status: "passed",
  });

  const [formErrors, setFormErrors] = useState({
    interviewDate: "",
    phase: "",
    status: "",
    note: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setSubmitData({
      ...submitData,
      interviewDate: new Date(date).toString(),
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {
      interviewDate: "",
      phase: "",
      status: "",
      note: "",
    };

    // Validate interview date
    if (!submitData.interviewDate) {
      errors.interviewDate = "Please enter a date";
      isValid = false;
    } else if (submitData.interviewDate > new Date()) {
      errors.interviewDate = "Date cannot be in the future";
      isValid = false;
    }

    // Validate phase
    if (!["cv", "hr", "tech", "final"].includes(submitData.phase)) {
      errors.phase = "Phase must be cv, hr, tech, or final";
      isValid = false;
    }

    // Validate status
    if (!["passed", "declined"].includes(submitData.status)) {
      errors.status = "Status must be passed or declined";
      isValid = false;
    }

    // Validate note
    if (submitData.note.trim().length === 0) {
      errors.note = "Note is required";
      isValid = false;
    } else if (submitData.note.length > 500) {
      errors.note = "Note cannot be more than 500 words";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (window.confirm("Are you sure you want to submit the form?")) {
        submitData.candidateName.length > 0 && postReport(submitData);
        window.location.href = "/admin/reports";
      }
    }
  };

  useEffect(() => {
    setSubmitData((submitData) => ({
      ...submitData,
      candidateId: props.selectedCandidateId,
      candidateName: props.selectedCandidate,
      companyId: props.selectedCompanyId,
      companyName: props.selectedCompany,
    }));
  }, [props]);

  console.log("Submit Data", submitData);

  // FORMAT INPUT DATE
  const formatDateInput = (date) => {
    let date1 = new Date(date);
    const day = `${date1.getDate() < 10 ? "0" : ""}${date1.getDate()}`;
    const month = `${date1.getMonth() + 1 < 10 ? "0" : ""}${
      date1.getMonth() + 1
    }`;
    const year = date1.getFullYear();
    return `${year}-${month}-${day}`;
  };

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
            <button className="btn btn-outline-secondary report-button">
              <Link to="/admin/select_company">2. Select Company</Link>
            </button>
            <button className="btn btn-outline-secondary report-button emphasize">
              <Link to="/admin/fill_details">3. Fill Report Details</Link>
            </button>
          </>
          <div className="selectedInfo">
            <h5>Candidate:</h5>
            <h4>{props.selectedCandidate}</h4>
            <h5>Company:</h5>
            <h4>{props.selectedCompany}</h4>
          </div>
        </div>
        <div className="div-right">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="interviewDate">Interview Date:</label>
              <input
                type="date"
                className={`form-control dateLabel ${
                  formErrors.interviewDate && "is-invalid"
                }`}
                id="interviewDate"
                name="interviewDate"
                value={formatDateInput(submitData.interviewDate)}
                // value={submitData.interviewDate}
                onChange={(event) => handleDateChange(event.target.value)}
              />
              {formErrors.interviewDate && (
                <div className="invalid-feedback">
                  {formErrors.interviewDate}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phase">Interview Phase:</label>
              <select
                className={`form-control ${formErrors.phase && "is-invalid"}`}
                id="phase"
                name="phase"
                value={submitData.phase}
                onChange={handleInputChange}
              >
                <option value="cv">CV</option>
                <option value="hr">HR</option>
                <option value="tech">Technical</option>
                <option value="final">Final</option>
              </select>
              {formErrors.phase && (
                <div className="invalid-feedback">{formErrors.phase}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="status">Interview Status:</label>
              <select
                className={`form-control ${formErrors.status && "is-invalid"}`}
                id="status"
                name="status"
                value={submitData.status}
                onChange={handleInputChange}
              >
                <option value="passed">Passed</option>
                <option value="declined">Declined</option>
              </select>
              {formErrors.status && (
                <div className="invalid-feedback">{formErrors.status}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="note">Note:</label>
              <textarea
                className={`textArea form-control ${
                  formErrors.note && "is-invalid"
                }`}
                id="note"
                name="note"
                value={submitData.note}
                onChange={handleInputChange}
              />
              {formErrors.note && (
                <div className="invalid-feedback">{formErrors.note}</div>
              )}
            </div>
            <button className="btn btn-outline-one">
              <Link to="/admin/select_company">BACK</Link>
            </button>
            <button type="submit" className="btn btn-outline-one bgSubmit">
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

  export default FillDetails;