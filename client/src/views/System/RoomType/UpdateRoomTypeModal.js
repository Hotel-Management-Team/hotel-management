import React from "react";
import { useState, useEffect, useContext } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";

const UpdateRoomTypeModal = () => {
  const {
    showUpdateRoomTypeModal,
    setShowUpdateRoomTypeModal,
    updateRoomType,
    showToast,
    roomTypeState: { roomType },
    setShowToast,
  } = useContext(RoomTypeContext);

  const [newRoomType, setNewRoomType] = useState(roomType);

  const { name, description, numberOfRoom } = newRoomType;

  const closeDialog = () => {
    setShowUpdateRoomTypeModal(false);
    setNewRoomType(roomType);
  };

  const onChangeNewRoomTypeForm = (e) => {
    setNewRoomType({
      ...newRoomType,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setNewRoomType(roomType);
  }, [roomType]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, msg } = await updateRoomType(newRoomType);
    setShowToast({ show: true, msg, type: success ? "success" : "danger" });
    closeDialog();
  };

  return (
    <Modal show={showUpdateRoomTypeModal} onHide={closeDialog} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nhập thông tin loại phòng cần chỉnh sửa</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Nhập tên loại phòng"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeNewRoomTypeForm}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewRoomTypeForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={name === "" || description === ""}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateRoomTypeModal;
