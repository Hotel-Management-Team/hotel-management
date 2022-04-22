import React from "react";
import { useContext, useEffect } from "react";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";
import { Spinner, Table, Button, Toast } from "react-bootstrap";
import EditIcon from "../../../assets/pencil.svg";
import DeleteIcon from "../../../assets/trash.svg";
import ControlBar from "../../../components/common/ControlBar";
import AddRoomTypeModal from "./AddRoomTypeModal";
import DeleteRoomTypeModal from "./DeleteRoomTypeModal";
import UpdateRoomTypeModal from "./UpdateRoomTypeModal";
import { RoomsContext } from "../../../contexts/RoomsContext";

const RoomType = () => {
  const {
    roomTypeState: { roomTypeLoading, roomTypes, roomType },
    getRoomTypes,
    setShowAddRoomTypeModal,
    showToast: { show, msg, type },
    setShowToast,
    findRoomType,
    setShowDeleteRoomTypeModal,
    setShowUpdateRoomTypeModal,
  } = useContext(RoomTypeContext);

  const {
    roomsState: { rooms },
    getRooms,
  } = useContext(RoomsContext);

  const chooseRoomType = (roomTypeId) => {
    findRoomType(roomTypeId);
  };

  useEffect(() => {
    getRoomTypes();
    getRooms();
    console.log("RoomType");
  }, [rooms.length]);

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
      {roomType !== null && <DeleteRoomTypeModal />}
      {roomType !== null && <UpdateRoomTypeModal />}
      <div className="container text-center">
        <Table responsive bordered hover>
          <thead>
            <tr className="text-primary bg-light border border-info">
              <th>#</th>
              <th>Tên loại phòng</th>
              <th>Mô tả</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {roomTypes.map((roomtype, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{roomtype.name}</td>
                <td>{roomtype.description}</td>
                <td> {roomtype.numberOfRoom} </td>
                <td>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      chooseRoomType(roomtype._id);
                      setShowUpdateRoomTypeModal(true);
                    }}
                  >
                    <img src={EditIcon} alt="edit" width="24" height="24" />
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      chooseRoomType(roomtype._id);
                      setShowDeleteRoomTypeModal(true);
                      console.log(roomType);
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
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          msg: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{msg}</strong>
        </Toast.Body>
      </Toast>
    </>
  );

  return <>{body}</>;
};
export default RoomType;
