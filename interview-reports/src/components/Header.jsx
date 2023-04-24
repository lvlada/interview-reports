import React from 'react';
import "./header.scss"
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className="py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h3>
            <Link className="header-link" to="/">
              Interviews Reports
            </Link>
          </h3>
          <button className="btn candidatesBtn">
            <Link to="/admin/reports"><strong>Reports</strong></Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;