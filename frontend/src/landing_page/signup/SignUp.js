import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext'; // Adjust this path as needed



export default function Signup() {
    const navigate = useNavigate(); 
  const [user, setUser] = useState({
    email: '',
    username: '',
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
    try {
      // Send signup request
      const response = await axios.post('http://localhost:8080/signup', user);
      if (response.data.success) {
        login();
        const {email,id,username}=response.data.user;
        console.log(response.data.user);
        navigate('/login');
      }
  
      // Debugging - log the entire response to see what's happening
      console.log("Response:", response);
  
      // If the response status is 200 or 201, show success message
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Signup successful!');
        
        setErrorMessage(''); // Clear error message
      }
    } catch (error) {
      // Debugging - log the entire error response to identify the issue
      console.error("Error Response:", error);
  
      // Clear success message
      setSuccessMessage('');
  
      // Check if error response contains a specific message
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Show backend error message
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
              <h2 className="text-center mb-4 fs-1">Sign Up</h2>

            {/* Display success message */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Display error message */}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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

                <Form.Group className="mb-4" controlId="formUsername">
                  <Form.Label className="fs-5">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
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
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <p className="text-center text-muted mt-4 fs-6">
          Already have an account? <Link to="/login" style={{textDecoration:"none" }}>Login</Link>
              
          </p>
          <p className="text-center text-muted mt-4 fs-6">&copy;2023 MarketIntel. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  );
}
