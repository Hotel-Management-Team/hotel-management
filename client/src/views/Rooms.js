import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../contexts/RoomsContext";
import Spinner from "react-bootstrap/esm/Spinner";
import CardRoom from "../components/common/CardRoom";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const {
    roomsState: { roomsLoading, rooms },
    getRooms,
  } = useContext(RoomsContext);

  useEffect(() => {
    if (rooms.length === 0) {
      getRooms();
    }
  }, []);

  const navigate = useNavigate();

  if (roomsLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return (
    <>
      <div className="container-fluid my-1 d-flex justify-content-between">
        <div>
          <button
            className="btn btn-info"
            onClick={() => {
              navigate("/system-management");
            }}
          >
            Trở lại
          </button>
        </div>
        <button className="btn btn-info">Thêm phòng</button>
      </div>
      <div className="container my-5">
        <div className="row g-5">
          {rooms.map((room) => (
            <div className="col-md-4" key={room._id}>
              <CardRoom Room={room} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Rooms;
