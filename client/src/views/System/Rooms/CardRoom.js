import React from "react";
import { Card, Badge } from "react-bootstrap";
import ActionButton from "./ActionButton";

const CardRoom = ({ Room }) => {
  return (
    <>
      <Card border="info" style={{ width: "21rem" }}>
        <Card.Header>
          <ActionButton _id={Room._id}>
            <h4> {Room.name}</h4>
          </ActionButton>
        </Card.Header>
        <Card.Body>
          <Card.Title>{Room.roomtype.name}</Card.Title>
          <Card.Text>{Room.description}</Card.Text>
          <h5 className="d-flex justify-content-end">
            <Badge
              bg={
                Room.status === "Booked"
                  ? "danger"
                  : Room.status === "NeedClean"
                    ? "warning"
                    : "success"
              }
            >
              {Room.status}
            </Badge>
          </h5>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end  bg-white">
          <h4 className="text-danger">
            {" "}
            {Room.charge.FirstBlockCharge}đ
            <small>/{Room.charge.FirstBlock}h</small>
          </h4>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CardRoom;
