import React from 'react'
import Select from './Select'


import {Col, Container, Form, Row } from "react-bootstrap";

function SignUp() {
  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Sign Up</h1>
        <Row className="mt-5">
          <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>



              <div class="row mb-3">
                <div class="col-sm-10 offset-sm-2">
                </div>
              </div>

              <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary" type="button">Sign Up</button>
                <Select />
              </div>



            </Form>
          </Col>
        </Row>
      </Container>


    </>
  );
};

export default SignUp
