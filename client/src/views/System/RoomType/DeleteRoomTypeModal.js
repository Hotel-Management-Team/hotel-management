import Button from "react-bootstrap/Button";
import editIcon from "../../../assets/pencil.svg";
import deleteIcon from "../../../assets/trash.svg";
import { Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";

const DeleteRoomTypeModal = () => {
  const {
    showDeleteRoomTypeModal,
    setShowDeleteRoomTypeModal,
    deleteRoomType,
    setShowToast,
    roomTypeState: { roomType },
  } = useContext(RoomTypeContext);

  return (
    <Modal
      show={showDeleteRoomTypeModal}
      onHide={() => {
        setShowDeleteRoomTypeModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Bạn có chắc chắn rằng muốn xóa loại phòng này?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* if roomType not null show roomtype.name */}
        {roomType && (
          <h5 className="d-flex justify-content-center">{roomType.name}</h5>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={async () => {
            if (roomType.numberOfRoom > 0) {
              setShowToast({
                show: true,
                msg: "Không thể xóa loại phòng này",
                type: "danger",
              });
              setShowDeleteRoomTypeModal(false);
              return;
            }

            const { success, msg } = await deleteRoomType(roomType._id);
            setShowToast({
              show: true,
              msg,
              type: success ? "success" : "danger",
            });
            setShowDeleteRoomTypeModal(false);
          }}
        >
          YES
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRoomTypeModal;
