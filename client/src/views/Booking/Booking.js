import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../../contexts/RoomsContext";
import { BookingsContext } from "../../contexts/BookingsContext";
import { Spinner, Form, Col, Row } from "react-bootstrap";
import { AddBookingModal } from "./AddBookingModal";
import Select from "react-select";
import ControlBar from "../../components/common/ControlBar";

const Booking = () => {

  const options = [
    { value: "Waiting", label: "Đang chờ" },
    { value: "Using", label: "Đang sử dụng" },
    { value: "Available", label: "Khả dụng" },
    { value: "NeedClean", label: "Cần dọn" },
  ];

  const {
    roomsState: { rooms, roomLoading },
    getRoomsTickets,
  } = useContext(RoomsContext);

  const {
    bookingsState: { bookings },
    filterByDate,
    showAddBookingModal,
    setShowAddBookingModal,
  } = useContext(BookingsContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [dateArrival, setDateArrival] = useState("");
  const [dateDeparture, setDateDeparture] = useState("");

  useEffect(() => {
    if (rooms.length === 0) {
      getRoomsTickets();
    }
  }, []);

  if (roomLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      <ControlBar
        Link="/dashboard"
        onClickAdd={setShowAddBookingModal.bind(this, true)}
      />
      {<AddBookingModal />}
      < div className="container d-flex flex-column p-4" >
        <div className="p-3">
          <h3 className="text-center">Loại phòng</h3>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={options}
            placeholder="Select status"
            selectedValue={selectedOption}
            // get option selected
            onChange={(selectedOption) => {
              setSelectedOption(selectedOption);
              filterByDate({ arrival: dateArrival, departure: dateDeparture }, selectedOption, rooms);
            }}
          />
        </div>
        <Form className="p-3">
          <Row>
            <Col>
              <Form.Group controlId="arrival">
                <Form.Label>Chọn ngày giờ đến</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="arrival"
                  value={dateArrival}
                  format="yyyy-MM-dd HH:mm"
                  onChange={(date) => {
                    setDateArrival(date.target.value);
                    filterByDate({ arrival: date.target.value, departure: dateDeparture }, selectedOption, rooms);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="departure">
                <Form.Label>Chọn ngày giờ rời</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="departure"
                  value={dateDeparture}
                  format="yyyy-MM-dd HH:mm"
                  onChange={(date) => {
                    setDateDeparture(date.target.value);
                    filterByDate({ arrival: dateArrival, departure: date.target.value }, selectedOption, rooms);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <div className="p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room Name</th>
                <th scope="col">Status</th>
                <th scope="col">Arrival</th>
                <th scope="col">Departure</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((room, index) => {
                if (room.tickets.length === 0) {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{room.name}</td>
                      <td className="text-danger">{
                        room.status === "Available" ? "Khả dụng" : room.status === "NeedClean" ? "Cần dọn" : room.status === "Using" ? "Đang sử dụng" : "Đang chờ"
                      }</td>
                      <td>Khả dụng</td>
                      <td>Khả dụng</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => console.log("Clicked")}
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  for (const ticket of room.tickets) {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{room.name}</td>
                        <td className="text-danger">{
                          room.status === "Available" ? "Khả dụng" : room.status === "NeedClean" ? "Cần dọn" : room.status === "Using" ? "Đang sử dụng" : "Đang chờ"
                        }</td>
                        <td>{
                          new Date(ticket.arrivalDate).toLocaleString("en-GB", {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric",
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })
                        }</td>
                        <td>{
                          new Date(ticket.departureDate).toLocaleString("en-GB", {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric",
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => console.log("Clicked")}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    );
                  }
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Booking;
