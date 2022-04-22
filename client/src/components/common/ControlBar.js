import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ControlBar = ({ Link, onClickAdd }) => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid my-2">
      <Row className="justify-content-between">
        <Col xs={3} className="d-flex justify-content-center">
          <Button variant="outline-success" onClick={() => navigate(Link)}>
            Trở về
          </Button>
        </Col>
        <Col xs={3} className="d-flex justify-content-center">
          <Button
            variant="outline-success"
            onClick={() => {
              onClickAdd();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ControlBar;
