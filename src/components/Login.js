import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";

const Login = ({ setShowLogInForm, setShowSignUpForm }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();
  const [succes, setSucces] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setSucces(true);
      setTimeout(() => {
        setShowSignUpForm(false);
        setShowLogInForm(false);
        history.push("/profile");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center exitForm"
        style={{ height: "100vh" }}
      >
        <div className="w-100 " style={{ maxWidth: "350px" }}>
          <Card style={{ color: "rgb(103, 109, 114)" }}>
            <Card.Body>
              <h2 className="text-center m-3">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {succes && (
                <Alert variant="success">Succesfully logged in.</Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button
                  className="w-100 my-4"
                  type="submit"
                  disabled={loading}
                  style={{ background: "rgb(144, 190, 222)", border: "none" }}
                >
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account?{" "}
            <button
              onClick={() => {
                setShowLogInForm(false);
                setShowSignUpForm(true);
              }}
              className="formOpener link"
            >
              Sign Up
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
