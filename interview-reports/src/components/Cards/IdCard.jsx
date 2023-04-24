import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import './IdCard.scss'
import { useNavigate } from "react-router-dom";

export default function IdCard({ content, id }) {
  const navigate = useNavigate();
  const navigateToCandidatePage = () => {
    navigate("/candidate-page", { state: { candidateId: id } });
  };

  return (
    <>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="lg"
      >

        <div id={id} className="col s12 m6 l4 xl3" onClick={navigateToCandidatePage}>

          <div class="card hoverable">
            <div class="card-image">
              <Image src={content.avatar} roundedCircle className="idImage" />
            </div>
            <div class="card-content s12 m6 l3 xl3">
              <span class="card-title">{content.name}</span>
              <p>
                <span className="email">{content.email}</span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}