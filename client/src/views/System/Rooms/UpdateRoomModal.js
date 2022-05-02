import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../../../contexts/RoomsContext";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";
import { ChargesContext } from "../../../contexts/ChargesContext";

const UpdateRoomModal = () => {
  // context
  const {
    roomsState: { room },
    showUpdateRoomModal,
    setShowUpdateRoomModal,
    updateRoom,
    setShowToast,
  } = useContext(RoomsContext);

  const [updatedRoomData, setUpdatedRoomData] = useState(room);

  const {
    roomTypeState: { roomTypes },
    getRoomTypes,
  } = useContext(RoomTypeContext);

  const {
    chargeState: { charges },
    getCharges,
  } = useContext(ChargesContext);

  useEffect(() => {
    getRoomTypes();
    getCharges();
  }, [charges.length, roomTypes.length]);

  useEffect(() => {
    setUpdatedRoomData(room);
  }, [room]);

  const { name, roomtype, charge, description, status } = updatedRoomData;

  const onChangeUpdateRoomForm = (e) => {
    setUpdatedRoomData({
      ...updatedRoomData,
      [e.target.name]: e.target.value,
    });
  };
  const closeDialog = () => {
    setUpdatedRoomData(room);
    setShowUpdateRoomModal(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, msg } = await updateRoom(updatedRoomData);
    setShowUpdateRoomModal(false);
    setShowToast({
      show: true,
      msg,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Modal show={showUpdateRoomModal} onHide={closeDialog} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nhập thông tin phòng cần chỉnh sửa</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập tên phòng"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeUpdateRoomForm}
            />
          </Form.Group>
          <Row className="align-items-center my-2">
            <Form.Group as={Col}>
              <Form.Select
                name="roomtype"
                defaultValue={roomtype._id}
                onChange={onChangeUpdateRoomForm}
              >
                <option value={null}>Chọn loại phòng</option>
                {roomTypes.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select
                name="charge"
                defaultValue={charge._id}
                onChange={onChangeUpdateRoomForm}
              >
                <option value={null}>Chọn loại giá</option>
                {charges.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select
                name="status"
                defaultValue={status}
                onChange={onChangeUpdateRoomForm}
              >
                {/* ["Waiting", "Using", "Available", "NeedClean"], */}
                <option value={null}>Chọn loại trang thái</option>
                <option value="Waiting">Waiting</option>
                <option value="Using">Using</option>
                <option value="Available">Available</option>
                <option value="NeedClean">Need Clean</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdateRoomForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={
              roomtype === "Chọn loại phòng" ||
              charge === "Chọn loại giá" ||
              name === "" ||
              description === "" ||
              status === "Chọn loại trạng thái"
            }
          >
            Chỉnh sửa
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateRoomModal;
