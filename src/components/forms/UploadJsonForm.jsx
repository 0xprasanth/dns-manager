import React, { useState } from "react";
import axios from "axios";
import "./uploadJsonForm.css";
import Cookies from "js-cookie";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "sonner";

const UploadJsonForm = () => {
  const [fileInput, setFileInput] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleFileChange = (event) => {
    setFileInput(event.target.files && event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hzid = Cookies.get("HostedZoneId").toString();
    const accessToken = Cookies.get("token").toString();

    const fileReader = new FileReader();

    fileReader.onload = (function (f) {
      // console.log(f);
      return async function (e) {
        try {
          // console.log(e);
          const jsonContent = JSON.parse(e.target.result);
          jsonContent.map(async (record) => {
            console.log(record);

            const response = await axios
              .post(
                `${import.meta.env.VITE_API_URL}/domain/records/create-record`,
                {
                  hostedZoneId: hzid,
                  record: record,
                },
                {
                  headers: `Bearer ${accessToken}`,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                // catch asynchronous event expection
                // that is handling error from the API server
                console.log( e.response.data);
                toast.error(
                  `${e.response.data.status}: ${e.response.data.message}`,
                  {
                    position: "top-right",
                  }
                );
              });

          });

        } catch (error) {
          // handle errors in files upload and parsing issues
          console.log(error);
          toast.error(`${error.status}: ${error.message}`, {
            position: "top-right",
          });
        }
      };
    })(fileInput);
    fileReader.readAsText(fileInput);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div className="button-container">
        <button onClick={handleShow} className="upload-button">
          Upload JSON file
        </button>
      </div>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload DNS Record</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-success" type="submit">
              Upload
            </Button>{" "}
            <Button onClose={() => setShow(!show)}>Cancel</Button>
          </Modal.Footer>
        </form>
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
