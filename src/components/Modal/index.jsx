import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formmodal.css";
// import successIcon from './success-icon.png';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Label } from "reactstrap";
import {  useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

function FormModal({ rootDomain }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [record, setRecord] = useState({
    domain: "",
    type: "A",
    value: "",
    ttl: 0,
    priority: undefined,
    weight: undefined,
    port: undefined,
    target: "",
    keyTag: undefined,
    algorithm: undefined,
    digestType: undefined,
    digest: "",
  });

  console.log(rootDomain);
  const [placeholder, setPlaceholder] = useState("");

  const accessToken = Cookies.get("token").toString();

  const hzId = Cookies.get("HostedZoneId").toString();

  const navigate = useNavigate();

  useEffect(() => {
    if (record.type !== "MX") {
      setRecord((prevValues) => ({ ...prevValues, priority: 0 }));
    }

    if (record.type !== "SRV") {
      setRecord((prevValues) => ({
        ...prevValues,
        weight: 0,
        port: 0,
        target: "",
      }));
    }

    if (record.type !== "DS") {
      setRecord((prevValues) => ({
        ...prevValues,
        keyTag: 0,
        algorithm: 0,
        digestType: 0,
        digest: "",
      }));
    }
  }, [record.type]);

  const handleInputChange = (prop) => (e) => {
    // const { name, value } = e.target;
    const value = prop === "ttl" ? parseInt(e.target.value) : e.target.value;

    setRecord({
      ...record,
      [prop]: value,
    });


    if (prop === "type") {
      setPlaceholder(getPlaceholder(value));
    }
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setRecord((prevRecord) => ({
      ...prevRecord,
      type: selectedType,
      value: "",
    }));
  };

  const getPlaceholder = (type) => {
    switch (type) {
      case "A":
        return "e.g., 192.0.2.1";
      case "AAAA":
        return "e.g., 2001:0db8::8a2e:0370:bab5";
      case "CNAME":
        return "e.g., www.example.com";
      case "MX":
        return "e.g., 10 mail.example.com";
      case "NS":
        return "e.g., ns1.example.com";
      case "PTR":
        return "e.g., www.example.com";
      case "SOA":
        return "e.g., ns1.example.com hostmaster.example.com 2024013101 7200 3600 1209600 3600";
      case "SRV":
        return "e.g., 1 10 3783 server.example.com";
      case "TXT":
        return 'e.g., "sample text"';
      case "DNSSEC":
        return "e.g., 12345 3 1 1 123456789 abcdef67890123456789abcdef6789";
      default:
        return "";
    }
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      record: record,
      hostedZoneData: {
        name: record.domain,
      },
    };

    console.log(payload);
  
    try {
      if (!record.domain) {
        record.domain = rootDomain.domain
      }
      // Send a POST request to the backend server
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/domain/records/create-record`,
        {
          record: record,
          hostedZoneId: hzId
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(`${record.domain} created successfully`);

      setRecord({
        domain: "",
        type: "A",
        value: "",
        ttl: 0,
        priority: 0,
        weight: 0,
        port: 0,
        target: "",
        keyTag: 0,
        algorithm: 0,
        digestType: 0,
        digest: "",
      });
      setShow(false);
      navigate("/")
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Error: DNS record already exists", {
          position: "top-right",
          invert: true,
        });
      } else {
        toast.error("Error: Unable to add DNS record", {
          position: "top-right",
          invert: true,
        });
        // setMessage();
      }
      console.error("Error adding DNS record:", error);
      setSuccess(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <button className="add-record-button" onClick={() => setShow(true)}>
        Add Record
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add DNS Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>

            <div className="grid gap-2">
            <Form.Text id='rootDomain info block'>
            Keep blank to create a record for the root domain.
            </Form.Text>

              <label>
                Domain
                <input
                  type="text"
                  name="domain"
                  value={record.domain}
                  onChange={handleInputChange("domain")}
                  placeholder={rootDomain?.domain}
                />
              </label>

            </div>


            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label>
                  Record Type*
                  <select
                    name="type"
                    value={record.type}
                    onChange={handleInputChange("type")}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="A">A (Address) Record</option>
                    <option value="AAAA">AAAA (IPv6 Address) Record</option>
                    <option value="CNAME">CNAME (Canonical Name) Record</option>
                    <option value="MX">MX (Mail Exchange) Record</option>
                    <option value="NS">NS (Name Server) Record</option>
                    <option value="PTR">PTR (Pointer) Record</option>
                    <option value="SOA">SOA (Start of Authority) Record</option>
                    <option value="SRV">SRV (Service) Record</option>
                    <option value="TXT">TXT (Text) Record</option>
                    <option value="DNSSEC">DNSSEC</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-2">
                <label htmlFor="domain">
                  Time To Live
                  <input
                    id="domain"
                    type="number"
                    min={0}
                    placeholder="Time To Live"
                    onChange={handleInputChange("ttl")}
                    onFocus={handleFocus}
                    required
                  />
                </label>
              </div>

              {
                // Priority field if type = "MX"
                record.type === "MX" && (
                  <div className="grid gap-2">
                    <label htmlFor="priority">
                      Priority
                      <input
                        id="priority"
                        type="number"
                        min="0"
                        max="65535"
                        placeholder="0-65535"
                        onChange={handleInputChange("priority")}
                        onFocus={handleFocus}
                        value={record.priority}
                      />
                    </label>
                  </div>
                )
              }

              {record.type === "SRV" && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="weight">
                      Weight
                      <input
                        id="weight"
                        type="number"
                        min="0"
                        placeholder="Weight"
                        onChange={handleInputChange("weight")}
                        value={record.weight}
                      />
                    </label>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="port">
                      Port
                      <input
                        id="port"
                        type="number"
                        min="0"
                        placeholder="Port"
                        onChange={handleInputChange("port")}
                        value={record.port}
                      />
                    </label>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="target">
                      Target
                      <input
                        id="target"
                        placeholder="Target"
                        onChange={handleInputChange("target")}
                        value={record.target}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>

            <label>
              <span>Value*</span>
              <input
                type="text"
                name="value"
                value={record.value}
                onChange={handleInputChange("value")}
                onFocus={handleFocus}
                placeholder={placeholder}
                required
              />
            </label>

            <button type="submit">Add Record</button>

            <p className="notice">
              Note: Please ensure you use the correct value format for each
              record type.
            </p>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;

// const FormModal = ({ onClose }) => {

//   const [record, setRecord] = useState({
//     domain: '',
//     type: '',
//     value: ''
//   });

//   const [message, setMessage] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [placeholder, setPlaceholder] = useState('');

//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setRecord(prevRecord => ({
//       ...prevRecord,
//       [name]: value
//     }));
//   };

//   const handleTypeChange = e => {
//     const selectedType = e.target.value;
//     setRecord(prevRecord => ({
//       ...prevRecord,
//       type: selectedType,
//       value: ''
//     }));

//     setPlaceholder(getPlaceholder(selectedType));
//   };

//   const getPlaceholder = type => {
//     switch (type) {
//       case 'A':
//         return 'e.g., 192.0.2.1';
//       case 'AAAA':
//         return 'e.g., 2001:0db8::8a2e:0370:bab5';
//       case 'CNAME':
//         return 'e.g., www.example.com';
//       case 'MX':
//         return 'e.g., 10 mail.example.com';
//       case 'NS':
//         return 'e.g., ns1.example.com';
//       case 'PTR':
//         return 'e.g., www.example.com';
//       case 'SOA':
//         return 'e.g., ns1.example.com hostmaster.example.com 2024013101 7200 3600 1209600 3600';
//       case 'SRV':
//         return 'e.g., 1 10 3783 server.example.com';
//       case 'TXT':
//         return 'e.g., "sample text"';
//       case 'DNSSEC':
//         return 'e.g., 12345 3 1 1 123456789 abcdef67890123456789abcdef6789';
//       default:
//         return '';
//     }
//   };

//   const handleFocus = () => {
//     setPlaceholder('');
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       if (!record.domain) {
//         setMessage('Error: Domain is required');
//         setSuccess(false);
//         return;
//       }
//       // Send a POST request to the backend server
//       const response = await axios.post( `${import.meta.env.VITE_API_URL}/domain/records`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }, {
//         domain: record.domain,
//         type: record.type,
//         value: record.value
//       });
//       setMessage(response.data.message);
//       setSuccess(true);
//       setTimeout(() => {
//         setSuccess(false);
//       }, 3000);
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         setMessage('Error: DNS record already exists');
//       } else {
//         setMessage('Error: Unable to add DNS record');
//       }
//       console.error('Error adding DNS record:', error);
//       setSuccess(false);
//       setTimeout(() => {
//         setMessage('');
//       }, 3000);
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}> × </span>
//         <h2>Add Record</h2>
//         {success && (
//           <div className="success-message">
//             <img src={successIcon} alt="Success Icon" className="success-icon" />
//             <p>{message}</p>
//           </div>
//         )}
//         {!success && message && <p className={message.startsWith('Error') ? 'error-message' : ''}>{message}</p>}
//         <form onSubmit={handleSubmit}>

//           <label>
//             Domain*
//             <input
//               type="text"
//               name="domain"
//               value={record.domain}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Record Type*
//             <select
//               name="type"
//               value={record.type}
//               onChange={handleTypeChange}
//               required
//             >
//               <option value="">Select Type</option>
//               <option value="A">A (Address) Record</option>
//               <option value="AAAA">AAAA (IPv6 Address) Record</option>
//               <option value="CNAME">CNAME (Canonical Name) Record</option>
//               <option value="MX">MX (Mail Exchange) Record</option>
//               <option value="NS">NS (Name Server) Record</option>
//               <option value="PTR">PTR (Pointer) Record</option>
//               <option value="SOA">SOA (Start of Authority) Record</option>
//               <option value="SRV">SRV (Service) Record</option>
//               <option value="TXT">TXT (Text) Record</option>
//               <option value="DNSSEC">DNSSEC</option>
//             </select>
//           </label>
//           <label>
//             <span>Value*</span>
//             <input
//               type="text"
//               name="value"
//               value={record.value}
//               onChange={handleInputChange}
//               onFocus={handleFocus}
//               placeholder={placeholder}
//               required
//             />
//           </label>
//           <button type="submit">Add Record</button>
//           <p className="notice">Note: Please ensure you use the correct value format for each record type.</p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FormModal;
