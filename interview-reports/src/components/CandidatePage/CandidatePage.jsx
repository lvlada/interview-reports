import React, { useEffect, useState } from "react";
import "./candidate.scss";
import Tabela from "../Tabela/Tabela";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { fetchCandidates } from "../Services/userAPI";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CandidatePage = () => {
  const navigate = useNavigate();
  // Hook useLocation() za transfer parametara sa komponente idCard, kroz hook useNavigate (state)
  const location = useLocation();
  // console.log("Candidate ID:", location.state.candidateId);
  const candidateId = location.state.candidateId + "";

  const [candidate, SetCandidate] = useState({});

  useEffect(() => {
    async function fetchCandidate() {
      const resData = await fetchCandidates(`?id=${candidateId}`);
      // console.log("resData", resData);
      SetCandidate(resData[0]);
    }

    fetchCandidate();
  }, []);

  // BIRTHDAY
  const birth = candidate.birthday?.toString() || "";
  const birthday = birth.split(" ");
  // console.log(birthday);
  const candidateBirthday = `${birthday[2]}.${
    birthday[1] === "Jan"
      ? "01"
      : birthday[1] === "Feb"
      ? "02"
      : birthday[1] === "Mar"
      ? "03"
      : birthday[1] === "Apr"
      ? "04"
      : birthday[1] === "May"
      ? "05"
      : birthday[1] === "Jun"
      ? "06"
      : birthday[1] === "Jul"
      ? "07"
      : birthday[1] === "Aug"
      ? "08"
      : birthday[1] === "Sep"
      ? "09"
      : birthday[1] === "Oct"
      ? "10"
      : birthday[1] === "Nov"
      ? "11"
      : birthday[1] === "Dec"
      ? "12"
      : null
  }.${birthday[3]}.`;

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="container">
          <button
            className="btn back"
            onClick={() => {
              console.log("redirecting.....");
              navigate(-1);
            }}
          >
            <i class="material-icons left">arrow_back</i> <span>Back</span>
          </button>
        </div>
        <div className="container">
          <div className="div-left">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <img className="col s12" src={candidate.avatar} alt="No Image" />
            </motion.div>
          </div>
          <div className="div-right">
            <div className="div-right1">
              <h5 className="titles">Name:</h5>
              <h4 className="text">{candidate.name}</h4>
              <br></br>
              <h5 className="titles">Email:</h5>
              <h4 className="text">{candidate.email}</h4>
            </div>
            <div className="div-right2">
              <h5 className="titles">Date of birth:</h5>
              <h4 className="text">{candidateBirthday}</h4>
              <br></br>
              <h5 className="titles">Education:</h5>
              <h4 className="text">{candidate.education}</h4>
            </div>
          </div>
        </div>
        <div className="container second">
          <h4>Reports</h4>
          <Tabela id={candidateId} />
        </div>
      </div>
    </>
  );
};

export default CandidatePage;
