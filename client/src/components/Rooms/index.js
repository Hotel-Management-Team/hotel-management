import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../../contexts/RoomsContext";
import Spinner from "react-bootstrap/esm/Spinner";
import CardRoom from "./CardRoom";
import { useNavigate } from "react-router-dom";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Toast,
  Form,
  FormControl,
} from "react-bootstrap";
import addIcon from "../../assets/plus-circle-fill.svg";
import AddRoomModal from "./AddRoomModal";
import UpdateRoomModal from "./UpdateRoomModal";

const Rooms = () => {
  const {
    roomsState: { roomsLoading, rooms, room },
    getRooms,
    setShowAddRoomModal,
    showToast: { show, msg, type },
    setShowToast,
    roomsDispatch,
  } = useContext(RoomsContext);

  useEffect(() => {
    if (rooms.length === 0) {
      getRooms();
    }
  }, []);

  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    roomsDispatch({
      type: "SEARCH_ROOM",
      payload: search.toLocaleLowerCase(),
    });
  };

  const navigate = useNavigate();

  if (roomsLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid mt-2">
        <Form className="d-flex justify-content-center" onSubmit={onSubmit}>
          <Button
            variant="outline-success"
            onClick={() => {
              // back to stack
              navigate("/system-management");
            }}
          >
            Trở về
          </Button>
          <FormControl
            type="search"
            placeholder="Search"
            value={search}
            onFocus={() => {
              getRooms();
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            // max width 60%
            style={{ maxWidth: "60%", marginLeft: "1rem", marginRight: "1rem" }}
            aria-label="Search"
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </div>

      <div className="container overflow-hidden my-5">
        <div className="row g-5">
          {rooms.map((room) => (
            <div
              className="col-md-4 d-flex justify-content-center"
              key={room._id}
            >
              <CardRoom Room={room} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-top">
              <strong>Thêm mới</strong>
            </Tooltip>
          }
        >
          <Button
            className="btn-floating border-0 bg-white"
            onClick={setShowAddRoomModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </div>
      <AddRoomModal />
      {room !== null && <UpdateRoomModal />}
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
};
export default Rooms;
