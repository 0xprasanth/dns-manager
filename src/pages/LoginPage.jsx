import { toast } from "sonner";
import React from "react";
import { Row, Container, Col, CardBody } from "react-bootstrap";
import { Card, Form, FloatingLabel, CardHeader, CardTitle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const {login } = useAuth();
    const navigate = useNavigate();

    const [values, setValues] = useState<{ email, password }>({
      email: "",
      password: "",
    });
  
    const handleChange =
      (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!values.email || !values.password) {
        return;
      }
  
      await login(values.email, values.password);
  
      toast.success("Loggedin successfully");
  
      navigate("/dashboard");
    };

  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
        <div className="w-full p-2 text-2xl bg-slate-200/20 shadow-sm font-bold tracking-tighter capitalize fixed top-0 flex items-start">
            DNS Manager
        </div>
        <CardHeader className="w-full max-w-sm">
            <CardTitle className="text-2xl"> Login</CardTitle>
            <CardBody>Enter Email and Password</CardBody>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardBody className="grid gap-4">
                <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={values.email}
                        // onChange={handleChange("email")}
                    />
                </div>
            </CardBody>
        </form>
        

    </div>
  );
};

export default LoginPage;
