import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';



export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'https://marketintel-2r6w.onrender.com/login',
        user,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const { id, email, username } = response.data.user;
        console.log("User Info:", id, email, username);

        // Store user data in localStorage
        const userData = { id, email, username };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Verify data was stored correctly
        console.log("User saved to localStorage:", JSON.parse(localStorage.getItem('userData')));
        
        login(); // Call login function from context
        setSuccessMessage('Login successful!');

        // Redirect to dashboard with user data in URL parameters
        const dashboardURL = new URL('https://dashboard-hj5i.onrender.com');
        dashboardURL.searchParams.set('userData', JSON.stringify(userData));
        window.location.href = dashboardURL.toString();

      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error Response:", error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  


  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 fs-1">Login</h2>

              {/* Display success message */}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}

              {/* Display error message */}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label className="fs-5">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                    className="py-2 fs-5"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fs-5">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="py-2 fs-5"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2 fs-5 mt-3">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <p className="text-center text-muted mt-4 fs-6">
            Don't have an account? <Link to="/signup" style={{ textDecoration: "none" }}>Signup</Link>
          </p>
          <p className="text-center text-muted mt-4 fs-6">
            &copy;2023 MarketIntel. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
