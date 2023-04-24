import React from "react";
import Modal from "react-bootstrap/Modal";
import "./Modal.scss";

const InfoModal = ({ content, date, show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <Modal.Header closeButton >
        {content.candidateName}
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body className="name">
        <table className="tableOne">
          <div className="all">
          <div className="head">
          <tr>
            <td >
              <p className="nameOne">Company</p> 
              {content.companyName}
            </td>
          </tr>
          <tr>
            <td>
              <p className="nameOne">Interview Date</p>
              {date}
            </td>
          </tr>
          <tr>
            <td>
              <p className="nameOne">Phase</p>
              {content.phase}
            </td>
          </tr>
          <tr>
            <td>
              <p className="nameOne">Status</p>
              {content.status}
            </td>
          </tr>
    </div>
          <tr>
            <td rowSpan={2}>
             <p className="nameOne"> Notes</p>
              {content.note}
            </td>
          </tr>
          </div>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModal;
