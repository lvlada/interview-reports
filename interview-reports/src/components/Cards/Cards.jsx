import React, { useEffect, useState } from "react";
import IdCard from "./IdCard";
import Search from "./Search";
import "./Card.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCandidates } from "../Services/userAPI";

const Cards = () => {
  const [candidates, setCandidates] = useState([]);
  const [filterCandidate, setFilterCandidate] = useState("");

  useEffect(() => {
    async function getCandidates() {
      const data = await fetchCandidates();
      setCandidates(data);
    }
    getCandidates();
  }, []);

  const getFilter = (value) => {
    setFilterCandidate(value);
  };

  return (
    <>
      <Search candidates={candidates} getFilter={getFilter} />

      <div className="container cards">
        <div className="row justify-content-center">
          <div className="col-12">
            {filterCandidate.length > 0 &&
              filterCandidate.map((candidate) => (
                <IdCard
                  content={candidate}
                  id={candidate.id}
                  key={candidate.id}
                />
              ))}

            {candidates &&
              filterCandidate.length === 0 &&
              candidates.map((candidate) => (
                <IdCard
                  content={candidate}
                  id={candidate.id}
                  key={candidate.id}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
