import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const Nav = useNavigate();

  const { email, password } = loginForm;

  const onchangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const [alert, setAlert] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({
          type: "danger",
          msg: loginData.msg,
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            className="my-3 py-2"
            type="text"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={onchangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="my-3 py-2"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onchangeLoginForm}
          />
        </Form.Group>
        <Button className="px-5" variant="success" type="submit">
          Login
        </Button>
      </Form>
      {/* <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p> */}
    </>
  );
};

export default LoginForm;
