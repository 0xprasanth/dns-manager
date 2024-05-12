import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

function AddDomain() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [domainName, setDomainName] = useState("");

  const hzId = Cookies.get("HostedZoneId").toString();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setDomainName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId").toString();
    const accessToken = Cookies.get("token").toString();

    try {
      if (!domainName) {
        toast.info("Domain Name is required", {
          position: "top-right",
        });
        return;
      }

      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/domain/records/create-hosted-zone/${userId}`,
        {
          hostedZoneData: {
            name: domainName,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("domain", response);
      toast.success(response?.data?.message);
      Cookies.set("HostedZoneId", response?.data?.user?.HostedZoneId, {
        expires: 7,
        sameSite: "None",
      });
      setShow(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        hidden={hzId ? false : true}
        onClick={handleShow}
      >
        Create Hosted Zone
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
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="domain-name">
              <Form.Label>Domain Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="example.com"
                value={domainName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddDomain;
