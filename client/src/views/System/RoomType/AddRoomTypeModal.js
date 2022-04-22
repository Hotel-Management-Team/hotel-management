import React from "react";
import { useState, useEffect, useContext } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";

const AddRoomTypeModal = () => {
  const {
    showAddRoomTypeModal,
    setShowAddRoomTypeModal,
    addRoomType,
    showToast,
    setShowToast,
  } = useContext(RoomTypeContext);

  const [newRoomType, setNewRoomType] = useState({
    name: "",
    description: "",
  });

  const { name, description } = newRoomType;

  const resetAddRomTypeData = () => {
    setNewRoomType({
      name: "",
      description: "",
    });
    setShowAddRoomTypeModal(false);
  };

  const closeDialog = () => {
    setShowAddRoomTypeModal(false);
    resetAddRomTypeData();
  };

  const onChangeNewRoomTypeForm = (e) => {
    setNewRoomType({
      ...newRoomType,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, msg } = await addRoomType(newRoomType);
    setShowToast({ show: true, msg, type: success ? "success" : "danger" });
    resetAddRomTypeData();
  };

  return (
    <Modal show={showAddRoomTypeModal} onHide={closeDialog} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nhập thông tin loại phòng cần thêm mới</Modal.Title>
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
            Thêm mới
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddRoomTypeModal;
