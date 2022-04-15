import React from "react";
import { Card } from "react-bootstrap";
const CardRoom = ({ Room }) => {
  return (
    <>
      <Card border="info" style={{ width: "21rem" }}>
        <Card.Header className="d-flex justify-content-center">
          {Room.name}
        </Card.Header>
        <Card.Body>
          <Card.Title>{Room.type}</Card.Title>
          <Card.Text>{Room.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end  bg-white">
          <h4 className="text-danger"> {Room.price} $</h4>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CardRoom;
