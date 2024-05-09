import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Card, CardBody, CardTitle, CardHeader, Input, Button, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';


const SignupPage = () => {
    const { signup } = useAuth();

    const navigate = useNavigate();
    
  
    const [values, setValues] = useState({
      email: "",
      password: "",
      username: ""
    });
  
    const handleChange =
      (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (
        !values.email ||
        !values.password ||
        !values.username
      ) {
        return;
      }
  
      await signup(
        values.email,
        values.password,
        values.username
      );
  
      toast("Account created successfully");
  
      navigate("/dashboard");
    };

  return (
    
    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardBody>
            Enter your information to create an account
          </CardBody>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardBody>
            <div className="grid gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="first-name">Username</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    required
                    value={values.username}
                    onChange={handleChange("username")}
                    
                  />
                </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  type="password"
                  required
                  placeholder="password"
                />
              </div>
              <br />
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !values.email ||
                  !values.password ||
                  !values.username
                }
              >
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardBody>
        </form>
      </Card>
    </div>
  
  )
}

export default SignupPage