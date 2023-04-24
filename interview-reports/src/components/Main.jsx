import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import Cards from "./Cards/Cards";
import Header from "../components/Header";

const Main = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Cards />
      </div>
    </>
  );
};

export default Main;
