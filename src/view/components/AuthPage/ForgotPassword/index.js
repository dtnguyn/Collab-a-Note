import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { resetPassword } from "../../../../controller/auth";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // try {
    //   setMessage("");
    //   setError("");
    //   setLoading(true);
    //   await resetPassword(emailRef.current.value);
    //   setMessage(
    //     "Check your email for instructions on how to reset your password"
    //   );
    // } catch {
    //   setError("Failed to Reset Password");
    // }
    setLoading(true);

    resetPassword(emailRef.current.value).then((response) => {
      setLoading(false);
      if (response.status) {
        setMessage(response.message);
      } else {
        setError(response.message);
      }
    });

    setLoading(false);
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
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/signin">Sign In?</Link>
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
