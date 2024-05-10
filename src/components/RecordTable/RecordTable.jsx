import React, { useState } from "react";
import "./recordTable.css";
import UpdateFormModal from "../Modal/UpdateFormModal";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const RecordsTable = ({ records, onDeleteRecord }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const recordsPerPage = 5;

  //   console.log(records);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Filter records based on search query
  const filteredRecords = records.filter(
    (record) =>
      (record.domain &&
        record.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.type &&
        record.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteRecord = async (record) => {
    const accessToken = Cookies.get("token").toString();
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/domain/records/${record.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        setSuccessMessage("Record deleted successfully");
      } else {
        console.error("This record cant be deleted:", response.statusText);
        toast.success("Deleted Successfully", {
          position: "top-right"
        })
        // setErrorMessage("This record cant be deleted");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      setErrorMessage("Error deleting record");
      navigateToDashboard();
    }
  };

  const handleOpenUpdateModal = (record) => {
    setRecordToUpdate(record);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setRecordToUpdate(null);
    setShowUpdateModal(false);
  };

  const navigateToDashboard = () => {
    window.location.href = "";
  };

  return (
    <div className="records-table-wrapper">
      <div className="records-table-container">
        <h2 className="table-heading">DNS Records Table</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <table className="records-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>TTL</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.id}</td>
                <td>{record.domain}</td>
                <td>{record.type}</td>
                <td>{record.ttl}</td>
                <td>{record.value}</td>
                <td>
                  <button
                    onClick={() => handleDeleteRecord(record)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <UpdateFormModal recordToUpdate={record} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredRecords.length / recordsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-4">
          <button
            className="back-to-dashboard-button"
            onClick={navigateToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
        <div className="col-4">
          <button
            className="reload-button"
            color="primary"
            onClick={() => window.location.reload(false)}
          >
            Reload
          </button>
        </div>
      </div>

      {showUpdateModal && (
        <UpdateFormModal
          recordToUpdate={recordToUpdate}
          onUpdate={(updatedRecord) => {
            console.log("Updated record:", updatedRecord);
          }}
          onClose={handleCloseUpdateModal}
        />
      )}
    </div>
  );
};

export default RecordsTable;
