import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.scss";
import "materialize-css/dist/css/materialize.min.css";

const Footer = () => {
  return (
    <footer class="page-footer container-fluid">
      <div class="container my-3 d-flex flex-column align-items-center">
        © 2023 Intellectual property of Jelena, Vlada, Blaža, and Matija. All
        rights reserved. All wrongs pardoned.
      </div>
    </footer>
  );
};

export default Footer;
