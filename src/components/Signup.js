import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../firebase/AuthContext";
import "../index.css";
import { addUserToDatabase } from "../firebase/DatabaseQueries";

const Signup = ({ setShowLogInForm, setShowSignUpForm }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value).then((res) => {
        addUserToDatabase(res.user);
      });
      setSucces(true);
      setTimeout(() => {
        setShowSignUpForm(false);
        setShowLogInForm(true);
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
        <div className="w-100" style={{ maxWidth: "350px" }}>
          <Card style={{ color: "rgb(126, 117, 116)" }}>
            <Card.Body>
              <h2 className="text-center m-3">Signup</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {succes && (
                <Alert variant="success">Account succesfully created.</Alert>
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

                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button
                  className="w-100 my-4"
                  type="submit"
                  disabled={loading}
                  style={{ background: "rgb(255, 183, 173)", border: "none" }}
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <button
              onClick={() => {
                setShowLogInForm(true);
                setShowSignUpForm(false);
              }}
              className="formOpener link"
            >
              {" "}
              Log In
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
