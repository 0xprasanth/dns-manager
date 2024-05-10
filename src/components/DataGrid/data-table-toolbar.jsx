import { useState } from "react";
import CreateDialog from "../dialog/CreateDialog";

export function DataTableToolBar({ table }) {
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [records, setRecords] = useState([]);
  const [showRecordsTable, setShowRecordsTable] = useState(false);
  const [showUploadJsonForm, setShowUploadJsonForm] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dns-records`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching DNS records:', error);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/dns-records/${recordId}`);
      const updatedRecords = records.filter(record => record.id !== recordId);
      setRecords(updatedRecords);
      console.log('Record deleted successfully:', recordId);
    } catch (error) {
      console.error('Error deleting record:', error);
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

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        input
      </div>
      <div>
      <div className="button-container">
        <button onClick={() => setShowUploadJsonForm(true)}>Upload JSON File</button>
        <button className="add-record-button" onClick={() => setShowModal(true)}>Add Record</button>
      </div>
      </div>
      

    </div>
  );
}
