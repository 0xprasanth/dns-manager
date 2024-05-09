import React from "react";
import { toast } from "sonner";
import { Row, Container, Col } from "react-bootstrap";
import { Card, Form, FloatingLabel } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div className="">
        <Card>

      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
        >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      
      <button onClick={() => toast("Logging IN")}>Submit</button>
          </Card>
    </div>
  );
};

export default LoginPage;
