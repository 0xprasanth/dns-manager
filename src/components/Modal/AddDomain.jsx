import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function AddDomain() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [domainName, setDomainName] = useState({
    domain: ''
  })

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault()
    setDomainName(
        e.target.value
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Domain
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Domain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="domain-name">
              <Form.Label>Domain Name*</Form.Label>
              <Form.Control type="text" placeholder="example.com" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddDomain;
