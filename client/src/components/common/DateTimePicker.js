import React from "react";
import { Row, Col, Form } from "react-bootstrap";
const DateTimePicker = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="dob">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dob"
                placeholder="Date of Birth"
              />
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateTimePicker;
