import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchReports } from "../../../components/Services/userAPI";
import InfoModal from "../../../components/Tabela/InfoModal";
import "./AdminTable.scss";
import { deleteReport } from "../../Services/adminAPI";
import AdminSearch from "./AdminSearch";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Tabela = (props) => {
  // const candidateId = props.id;
  // console.log("ID tabela", candidateId);

  const [reports, SetReports] = useState([]);
  const [sortTable, setSortTable] = useState({ sortState: 1 });
  const [filterCandidate, setFilterCandidate] = useState("");

  // useEffect(() => {
  //   console.log("SORTTABLE-APP", sortTable.sortState);
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

  console.log("Reports", reports);
  // Izdvojeni reports samo za kandidata
  const reportsForCandidate = reports;
  console.log("Reports for candidate", reportsForCandidate);
  console.log("Reports for candidate - sort", reportsForCandidate.sort());

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
  } else if (sortTable.sortState == 4) {
    reportsForCandidate.sort((a, b) => {
      let fa = a.candidateName.toLowerCase();
      let fb = b.candidateName.toLowerCase();

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

  //Filter Candidate
  const getFilter = (value) => {
    setFilterCandidate(value);
  };

  //////////////////////////////////
  const handleDeleteReport = (reportID) => {
    console.log("DELETE DATA", reportID);
    deleteReport(reportID);
    // TRIGGER RENDER PAGE
    window.location.reload(true);
  };

  return (
    <>
      <div className="container cont">
        <div className="row">
          <div className="col-xl-5 lg-6">
            <h1>Reports Administration</h1>
          </div>
          <div className="col-xl-7 lg-6 text-xl-end sm-12">
            <div className="container-fluid">
              <button className="btn btn-outline">
                <Link to="/">Interviews Reports</Link>
              </button>

              <button className="btn btn-outline">
                <Link to="/admin/reports">Reports</Link>
              </button>

              <button className="btn btn-outline">
                <Link to="/admin/select_candidate">Create Report</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <AdminSearch candidates={reportsForCandidate} getFilter={getFilter} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 20,
          }}
        >
          <Table bordered className="adTable">
            <thead>
              <tr>
                <th
                  className={`${
                    sortTable.sortState == 1 ? "active" : "nonActive"
                  }`}
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
                  className={`${
                    sortTable.sortState == 4 ? "active" : "nonActive"
                  }`}
                >
                  {" "}
                  <i
                    class="material-icons waves-effect"
                    onClick={() => {
                      setSortTable({ ...sortTable, sortState: 4 });
                    }}
                  >
                    expand_more
                  </i>
                  Name
                </th>
                <th
                  className={`${
                    sortTable.sortState == 2 ? "active" : "nonActive"
                  }`}
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
                  className={`${
                    sortTable.sortState == 3 ? "active" : "nonActive"
                  }`}
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
              {reportsForCandidate.length &&
                filterCandidate.length === 0 &&
                reportsForCandidate.map((item) => (
                  <tr>
                    <td>
                      {item.companyName}
                      <p>Company name</p>
                    </td>
                    <td>
                      {item.candidateName}
                      <p>Candidate</p>
                    </td>
                    <td>
                      {reportDate(item.interviewDate)}
                      <p>Interview date</p>
                    </td>
                    <td>
                      {item.status}
                      <p>Status</p>
                    </td>
                    <td className="show">
                      <i
                        hover
                        class="material-icons show waves-effect"
                        onClick={() => handleShow(item)}
                      >
                        visibility
                      </i>
                      <i
                        hover
                        class="material-icons show waves-effect"
                        onClick={() => handleDeleteReport(item.id)}
                      >
                        close
                      </i>
                    </td>
                  </tr>
                ))}

              {filterCandidate &&
                filterCandidate.map((item) => (
                  <tr>
                    <td>
                      {item.companyName}
                      <p>Company name</p>
                    </td>
                    <td>
                      {item.candidateName}
                      <p>Candidate</p>
                    </td>
                    <td>
                      {reportDate(item.interviewDate)}
                      <p>Interview date</p>
                    </td>
                    <td>
                      {item.status}
                      <p>Status</p>
                    </td>
                    <td className="show">
                      <i
                        hover
                        class="material-icons show waves-effect"
                        onClick={() => handleShow(item)}
                      >
                        visibility
                      </i>
                      <i
                        hover
                        class="material-icons show waves-effect"
                        onClick={() => handleDeleteReport(item.id)}
                      >
                        close
                      </i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </motion.div>

        {showModal()}
      </div>
    </>
  );
};

export default Tabela;
