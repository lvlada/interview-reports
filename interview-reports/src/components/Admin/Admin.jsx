import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SelectCandidate from "./SelectCandidate";
import SelectCompany from "./SelectCompany";
import FillDetails from "./FillDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import NoPageAdmin from "./NoPageAdmin";
import Reports from "./Reports";

const Admin = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  const handleSelectedCandidate = (data) => {
    setSelectedCandidate(data + "");
    console.log("Selected Candidate", data);
  };

  const handleSelectedCandidateId = (data) => {
    setSelectedCandidateId(data + "");
    console.log("Selected Candidate ID", data);
  };

  const handleSelectedCompany = (data) => {
    setSelectedCompany(data + "");
    console.log("Selected Company", data);
  };

  const handleSelectedCompanyId = (data) => {
    setSelectedCompanyId(data + "");
    console.log("Selected Company ID", data);
  };

  return (
    <>
      <Routes>
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/select_candidate"
          element={
            <SelectCandidate
              funcCandidate={handleSelectedCandidate}
              funcCandidateId={handleSelectedCandidateId}
              selectedCandidate={selectedCandidate}
            />
          }
        />
        <Route
          path="/select_company"
          element={
            <SelectCompany
              funcCompany={handleSelectedCompany}
              funcCompanyId={handleSelectedCompanyId}
              selectedCandidate={selectedCandidate}
              selectedCompany={selectedCompany}
            />
          }
        />
        <Route
          path="/fill_details"
          element={
            <FillDetails
              selectedCandidate={selectedCandidate}
              selectedCandidateId={selectedCandidateId}
              selectedCompany={selectedCompany}
              selectedCompanyId={selectedCompanyId}
            />
          }
        />
        <Route path="*" element={<NoPageAdmin />} />
      </Routes>
    </>
  );
};

export default Admin;
