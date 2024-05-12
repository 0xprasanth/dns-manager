import React, { useEffect, useState } from "react";
import "./dashboard.css";
import FormModal from "../components/Modal/index";
import RecordsTable from "../components/RecordTable/RecordTable";
import UploadJsonForm from "../components/forms/UploadJsonForm";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";
import AddDomain from "../components/Modal/AddDomain";

const Dashboard = () => {
  const [records, setRecords] = useState([]);

  const [showRecordsTable, setShowRecordsTable] = useState(false);

  const [isHostedZone, setIsHostedZone] = useState(false);

  const fetchRecords = async () => {
    const accessToken = Cookies.get("token").toString();
    const hzId = Cookies.get("HostedZoneId").toString();
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/domain/records/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          hostedZoneId: `${hzId}`
        }
      });
      console.log(response.data);

      setRecords(response.data.data);
      console.log(records);
    } catch (error) {
      console.error("Error fetching DNS records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

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
  console.log(isHostedZone);
  return (
    <>
      <Header />
      <hr />
      <div className="dashboard-container">
        <div className="button-container">
          <UploadJsonForm />

          <AddDomain />

          <FormModal />
        </div>
        <br />
        <RecordsTable records={records} onDeleteRecord={handleDeleteRecord} />
      </div>
    </>
  );
};

export default Dashboard;
