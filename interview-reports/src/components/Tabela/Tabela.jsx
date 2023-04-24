import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchReports } from "../Services/userAPI";
import InfoModal from "./InfoModal";
import './Table.scss'

const Tabela = (props) => {
  const candidateId = props.id;
  console.log("ID tabela", candidateId);

  const [reports, SetReports] = useState([]);
  const [sortTable, setSortTable] = useState({ sortState: 1 });

  // useEffect(() => {
  //   console.log("SORTTABLE", sortTable.sortState);
  // }, [sortTable]);

  const [show, setShow] = useState(false);
  const handleShow = (item) => {
    setShow(true);
    setCurrentItem(item);
  };
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    async function fetchReport() {
      const resData = await fetchReports();
      SetReports(resData);
    }

    fetchReport();
  }, []);

  const showModal = () => {
    if (show && currentItem) {
      return (
        <InfoModal
          content={currentItem}
          show={show}
          setShow={setShow}
          date={reportDate(currentItem.interviewDate)}
        />
      );
    }
  };

  // console.log("Reports", reports);

  // Izdvojeni reports samo za kandidata
  const reportsForCandidate = reports.filter(
    (item) => item.candidateId == candidateId
  );
  // console.log("Reports for candidate", reportsForCandidate);
  // console.log("Reports for candidate - sort", reportsForCandidate.sort());

  //SORT TABLE
  if (sortTable.sortState == 1) {
    reportsForCandidate.sort((a, b) => {
      let fa = a.companyName.toLowerCase();
      let fb = b.companyName.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else if (sortTable.sortState == 2) {
    reportsForCandidate.sort((a, b) => {
      let da = new Date(a.interviewDate);
      let db = new Date(b.interviewDate);
      return da - db;
    });
  } else if (sortTable.sortState == 3) {
    reportsForCandidate.sort((a, b) => {
      let fa = a.status.toLowerCase();
      let fb = b.status.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  // REPORT DATE FORMAT
  const reportDate = (data) => {
    const date1 = data?.toString() || "";
    const date2 = date1.split(" ");
    // console.log(date2);
    const dateFinal = `${date2[2]}.${
      date2[1] === "Jan"
        ? "01"
        : date2[1] === "Feb"
        ? "02"
        : date2[1] === "Mar"
        ? "03"
        : date2[1] === "Apr"
        ? "04"
        : date2[1] === "May"
        ? "05"
        : date2[1] === "Jun"
        ? "06"
        : date2[1] === "Jul"
        ? "07"
        : date2[1] === "Aug"
        ? "08"
        : date2[1] === "Sep"
        ? "09"
        : date2[1] === "Oct"
        ? "10"
        : date2[1] === "Nov"
        ? "11"
        : date2[1] === "Dec"
        ? "12"
        : null
    }.${date2[3]}.`;

    return dateFinal;
  };

  //New solution
  // const reportDate = (date) => {
  //   let date1 = new Date(date);
  //   const day = `${date1.getDate() < 10 ? "0" : ""}${date1.getDate()}`;
  //   const month = `${date1.getMonth() + 1 < 10 ? "0" : ""}${
  //     date1.getMonth() + 1
  //   }`;
  //   const year = date1.getFullYear();
  //   return `${day}.${month}.${year}`;
  // };

  //////////////////////////////////

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              className={`${sortTable.sortState == 1 ? "active" : "nonActive"}`}
            >
              <i
                class="material-icons waves-effect"
                onClick={() => {
                  setSortTable({ ...sortTable, sortState: 1 });
                }}
              >
                expand_more
              </i>
              Company
            </th>
            <th
              className={`${sortTable.sortState == 2 ? "active" : "nonActive"}`}
            >
              <i
                class="material-icons waves-effect"
                onClick={() => {
                  setSortTable({ ...sortTable, sortState: 2 });
                }}
              >
                expand_more
              </i>
              Interview Date
            </th>
            <th
              colSpan={2}
              className={`${sortTable.sortState == 3 ? "active" : "nonActive"}`}
            >
              <i
                className="material-icons waves-effect"
                onClick={() => {
                  setSortTable({ ...sortTable, sortState: 3 });
                }}
              >
                expand_more
              </i>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {reportsForCandidate.length > 0 &&
            reportsForCandidate.map((item) => (
              <tr>
                <td>{item.companyName}</td>
                <td>{reportDate(item.interviewDate)}</td>
                <td>{item.status}</td>
                <td className="show">
                  <i
                    hover
                    class="material-icons show waves-effect"
                    onClick={() => handleShow(item)}
                  >
                    visibility
                  </i>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {showModal()}
    </>
  );
};

export default Tabela;
