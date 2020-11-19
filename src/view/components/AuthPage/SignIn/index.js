import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { signin } from "../../../../controller/auth";
import { useAuth } from "../../../context/AuthContext";

import "../../../styles/Auth.css";

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  //const { signin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // try {
    //   setError("");
    //   setLoading(true);
    //   await signin(emailRef.current.value, passwordRef.current.value);
    //   history.push("/");
    // } catch {
    //   setError("Failed to sign in");
    // }
    // setLoading(false);

    signin(emailRef.current.value, passwordRef.current.value).then(
      (response) => {
        if (response.status) {
          history.push("/");
        } else {
          console.log("here");
          setError(response.message);
        }
      }
    );
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center auth-page"
      style={{ minheight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </>
      </div>
    </Container>
  );
}
