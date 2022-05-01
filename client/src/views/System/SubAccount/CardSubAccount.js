import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { SubAccountContext } from "../../../contexts/SubAccountContext";

const CardSubAccount = ({ SubAccount }) => {
  const {
    subAccountState: { subAccountLoading, subAccounts },
    banSubAccount,
    setShowEditSubAccountModal,
    findSubAccount,
    showEditSubAccountModal,
  } = useContext(SubAccountContext);

  //   const [showBanModal, setShowBanModal] = useState(false);

  //   const BanSubAccountModal = () => {

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
            <span>
              Email:{" "}
              {
                // if email length is greater than 20, then show only first 20 characters
                SubAccount.email.length > 25
                  ? SubAccount.email.substring(0, 25) + "..."
                  : SubAccount.email
              }
            </span>
            <br></br>
            <span>Username: {SubAccount.username}</span>
            <br></br>
            <span>Số điện thoại: {SubAccount.phoneNumber}</span>
            <br></br>
            <span>
              Ngày tạo: {new Date(SubAccount.createdAt).toLocaleDateString()}
            </span>{" "}
            <br></br>
            <span>
              <span>Tình trạng:</span>
              <Badge
                className="mx-3"
                pill
                //color based on status
                bg={SubAccount.isBanned ? "danger" : "success"}
              >
                {SubAccount.isBanned == true ? "Banned" : "Active"}
              </Badge>
            </span>
          </Card.Text>

          {SubAccount.role.toString() !== "Admin" && (
            <div className="d-flex justify-content-end">
              <Button
                className="mx-2"
                variant="outline-info"
                onClick={() => {
                  findSubAccount(SubAccount._id);
                  setShowEditSubAccountModal(true);
                }}
              >
                Sửa
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  banSubAccount(SubAccount._id);
                }}
              >
                {SubAccount.isBanned == true ? "Mở khóa" : "Khóa"}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardSubAccount;
