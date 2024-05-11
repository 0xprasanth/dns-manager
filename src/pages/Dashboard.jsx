import React, { useState } from "react";
import "./dashboard.css";
import FormModal from "../components/Modal/index";
import RecordsTable from "../components/RecordTable/RecordTable";
import UploadJsonForm from "../components/forms/UploadJsonForm";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";

const Dashboard = () => {


  const [showModal, setShowModal] = useState(false);

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const [records, setRecords] = useState([]);

  const [showRecordsTable, setShowRecordsTable] = useState(false);
  const [showUploadJsonForm, setShowUploadJsonForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    const accessToken = Cookies.get("token").toString();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/domain/records`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(response.data);
      
      setRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching DNS records:", error);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/dns-records/${recordId}`
      );
      const updatedRecords = records.filter((record) => record.id !== recordId);
      setRecords(updatedRecords);
      console.log("Record deleted successfully:", recordId);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleOpenRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const toggleRecordsTable = async () => {
    if (!showRecordsTable) {
      await fetchRecords();
    }
    setShowRecordsTable(!showRecordsTable);
  };
  console.log(showModal);
  return (
    <>
    <Header />
    <hr />x
    <div className="dashboard-container">
      <div className="button-container">
        <button onClick={() => setShowUploadJsonForm(true)}>
          Upload JSON File
        </button>

        <FormModal />

        <br />

      </div>

      <br />
        <RecordsTable records={records} onDeleteRecord={handleDeleteRecord} />
{/* 
      {showModal && <FormModal onClose={() => setShowModal()} />} */}


      {showRecordsTable && (
        <RecordsTable records={records} onDeleteRecord={handleDeleteRecord} />
      )}
      
      {showUploadJsonForm && (
        <UploadJsonForm onClose={() => setShowUploadJsonForm(false)} />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
    </>

  );
};

export default Dashboard;
