import React from 'react'
// import './SignUp.css'
import {Button, Col, Container, Form, Row} from "react-bootstrap";

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

               <fieldset class="row mb-3">
    <legend class="col-form-label col-sm-10 pt-10">Options</legend>
    <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
        <label class="form-check-label" for="gridRadios1">
          Teacher SignUp
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
        <label class="form-check-label" for="gridRadios2">
        Student SignUp
        </label>
      </div>
       <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" />
        <label class="form-check-label" for="gridRadios3">
       
             Guest signUp
        </label>
      </div>   
    </div>
                  
  </fieldset>
  <div class="row mb-3">
    <div class="col-sm-10 offset-sm-2">
  </div>
  </div>
       <Button variant="success btn-block" type="submit">
   Sign Up
      </Button>
    </Form>
   </Col>
  </Row>
</Container>
    </>
  );
};

export default SignUp