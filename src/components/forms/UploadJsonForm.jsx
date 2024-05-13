import React, { useState } from "react";
import axios from "axios";
import "./uploadJsonForm.css";
import Cookies from "js-cookie";
import { Modal, Form } from "react-bootstrap";

const UploadJsonForm = ({ onClose }) => {
  const [fileInput, setFileInput] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);
  const handleFileChange = (event) => {
    setFileInput(event.target.files[0]);
  };

  const uploadJsonFile = async () => {
    if (!fileInput) {
      setErrorMessage("Please select a file");
      return;
    }
    const accessToken = Cookies.get("token").toString();
    const hzid = Cookies.get("HostedZoneId").toString();

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        const { domain, type, value } = jsonContent;
        console.log(jsonContent);
        const response = await axios.post( `${import.meta.env.VITE_API_URL}/domain/records/bulk`,
          {
            hostesdZoneId: hzid,
            records: jsonContent}
          ,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },}
        );
        console.log("DNS record created:", response.message);
        setSuccessMessage("DNS record created successfully");
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Error uploading DNS record:", error);
        setErrorMessage("Error uploading DNS record");
      }
    };

    fileReader.readAsText(fileInput);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
    <div className="button-container">

      <button onClick={handleShow} className="upload-button">Upload JSON file</button>
    </div>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Update DNS Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          
          

          <div className="button-container">
            <button onClick={uploadJsonFile}>Upload</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
    // <div className="upload-json-form-container">
    //   <div className="upload-json-form">
    //     <h2>Upload JSON File</h2>
    //     <input type="file" onChange={handleFileChange} />
    //     <div className="button-container">
    //       <button onClick={uploadJsonFile}>Upload</button>
    //       <button onClick={onClose}>Cancel</button>
    //     </div>
    //     {successMessage && <p className="success-message" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '9999', backgroundColor: '#90EE90', color: 'white' }}>{successMessage}</p>}
    //     {errorMessage && <p className="error-message">{errorMessage}</p>}
    //   </div>
    // </div>
  );
};

export default UploadJsonForm;
