import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";
import { Spinner, Table, Button } from "react-bootstrap";
import EditIcon from "../../../assets/pencil.svg";
import DeleteIcon from "../../../assets/trash.svg";
import ControlBar from "../../../components/common/ControlBar";
import AddRoomTypeModal from "./AddRoomTypeModal";

const RoomType = () => {
  const {
    roomTypeState: { roomTypeLoading, roomTypes },
    getRoomTypes,
    showAddRoomTypeModal,
    setShowAddRoomTypeModal,
  } = useContext(RoomTypeContext);

  console.log();

  useEffect(() => {
    if (roomTypes.length === 0) {
      getRoomTypes();
    }
  }, []);

  if (roomTypeLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  let body = (
    <>
      <ControlBar
        Link="/system-management"
        onClickAdd={setShowAddRoomTypeModal.bind(this, true)}
      />
      <AddRoomTypeModal />
      <div className="container text-center">
        <Table responsive bordered hover>
          <thead>
            <tr className="text-primary bg-light border border-info">
              <th>#</th>
              <th>Tên loại phòng</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {roomTypes.map((roomType, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{roomType.name}</td>
                <td>{roomType.description}</td>
                <td>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      console.log("edit");
                    }}
                  >
                    <img src={EditIcon} alt="edit" width="24" height="24" />
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      console.log("delete");
                    }}
                  >
                    <img src={DeleteIcon} alt="edit" width="24" height="24" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );

  return <>{body}</>;
};
export default RoomType;
