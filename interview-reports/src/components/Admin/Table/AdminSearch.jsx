import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './AdminSearch.scss'

const AdminSearch = ({candidates, getFilter}) =>{
    const[inputVal, setInputVal] = useState('');

    useEffect(() => {
        const newRes = candidates.filter((user) =>
          user.candidateName.toString().toLowerCase().includes(inputVal.toLowerCase())
        );
        console.log(newRes);
        getFilter(newRes);
      }, [inputVal]);


    return(
        <div className="container">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row border-bottom pb-3">
              <div className="col s6 ml-auto text-start">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="&#128269; Search candidate"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                  }}
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminSearch;