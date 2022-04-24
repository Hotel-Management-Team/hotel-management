import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const CardSubAccount = ({ SubAccount }) => {
  console.log(SubAccount);

  return (
    <>
      <Card border="info" style={{ width: "21rem" }}>
        <Card.Header>
          <h5 className="d-flex justify-content-between">
            {SubAccount.fullName}
            {
              <Badge
                className="p-1"
                variant={
                  SubAccount.role.toString() == "Admin" ? "danger" : "primary"
                }
              >
                {SubAccount.role}
              </Badge>
            }
          </h5>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <h6>Email: {SubAccount.email}</h6>
            <h6>Username: {SubAccount.username}</h6>
            <h6>Số điện thoại: {SubAccount.phoneNumber}</h6>
            <h6>
              Ngày tạo: {new Date(SubAccount.createdAt).toLocaleDateString()}
            </h6>
          </Card.Text>
          <h5 className="d-flex justify-content-end">
            <Badge bg={SubAccount.isOnline === true ? "success" : "danger"}>
              {SubAccount.status}
            </Badge>
          </h5>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Ban</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CardSubAccount;
