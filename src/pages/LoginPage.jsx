import { toast } from "sonner";
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    const data = await login(values.email, values.password);
    console.log(data);
    document.cookie = `token=${data.accesstoken}`
    toast.success("Loggedin successfully");

    navigate("/dashboard");
  };
  return (
    <>
      <Container className="">
        <Row style={{marginTop:"130px"}}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardBody className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={values.email}
                    onChange={handleChange("email")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    required
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!values.email || !values.password}
                  color="primary"
                >
                  Sign in
                </Button>
              </CardFooter>
              <div className="pb-6 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;

/**
 * <Col
      className="bg-light border"
      md={{
        offset: 3,
        size: 6
      }}
      sm="12"
    >
      .col-sm-12 .col-md-6 .offset-md-3
    </Col>
 */

// const LoginForm = ({ handleChange, handleSubmit}) => {
//   return (

//   );
// };
