import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../../../contexts/RoomsContext";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";
import { ChargesContext } from "../../../contexts/ChargesContext";
const AddRoomModal = () => {
  // context
  const { showAddRoomModal, setShowAddRoomModal, addRoom, setShowToast } =
    useContext(RoomsContext);

  const {
    roomTypeState: { roomTypes, roomTypeLoading },
    getRoomTypes,
  } = useContext(RoomTypeContext);

  const {
    chargeState: { charges, chargeLoading },
    getCharges,
  } = useContext(ChargesContext);

  useEffect(() => {
    if (roomTypes.length === 0) {
      getRoomTypes();
    }
    if (charges.length === 0) {
      getCharges();
    }
  }, []);

  // state
  const [newRoom, setNewRoom] = useState({
    name: "",
    roomtype: null,
    charge: null,
    description: "",
    status: "Waiting",
  });

  const { name, roomtype, charge, description, status } = newRoom;

  const onChangeNewRoomForm = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value,
    });
  };
  const closeDialog = () => {
    resetAddRoomData();
  };
  const resetAddRoomData = () => {
    setNewRoom({
      name: "",
      roomtype: null,
      charge: null,
      description: "",
      status: "Booked",
    });
    setShowAddRoomModal(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, msg } = await addRoom(newRoom);
    setShowToast({ show: true, msg, type: success ? "success" : "danger" });
    resetAddRoomData();
  };
  return (
    <Modal show={showAddRoomModal} onHide={closeDialog} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nhập thông tin phòng cần thêm mới</Modal.Title>
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
              onChange={onChangeNewRoomForm}
            />
          </Form.Group>
          <Row className="align-items-center my-2">
            <Form.Group as={Col}>
              <Form.Select name="roomtype" onChange={onChangeNewRoomForm}>
                <option value={null}>Chọn loại phòng</option>
                {roomTypes.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select name="charge" onChange={onChangeNewRoomForm}>
                <option value={null}>Chọn loại giá</option>
                {charges.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select name="status" onChange={onChangeNewRoomForm}>
                <option value={null}>Chọn loại trang thái</option>
                <option value="Booked">Booked</option>
                <option value="Waiting">Waiting</option>
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
              onChange={onChangeNewRoomForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={
              roomtype === null ||
              charge === null ||
              name === "" ||
              description === "" ||
              status === null
            }
          >
            Thêm mới
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
