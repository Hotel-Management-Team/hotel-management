import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../../contexts/RoomsContext";
import { BookingsContext } from "../../contexts/BookingsContext";
import { CustomersContext } from "../../contexts/CustomersContext";
import { Spinner, Form, Col, Row, Toast } from "react-bootstrap";
import { CustomerModal } from "./CustomerModal";
import Select from "react-select";
import { AddCustomerModal } from "./AddCustomerModal";

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
    setShowCustomerModal,
    showToast: { show, msg, type },
    setShowToast,
  } = useContext(BookingsContext);

  const {
    customerState: { customers },
    getCustomers,
    customerDispatch,
  } = useContext(CustomersContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [dateArrival, setDateArrival] = useState("");
  const [dateDeparture, setDateDeparture] = useState("");

  useEffect(() => {
    getRoomsTickets();
  }, [rooms.length]);

  const handleBooking = (room) => {
    setShowCustomerModal(true);
  };

  if (roomLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      {<AddCustomerModal />}
      {customers !== null && <CustomerModal />}

      <div className="container d-flex flex-column p-4">
        <div className="p-3">
          <h3 className="text-center">Loại phòng</h3>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={options}
            placeholder="Select status"
            selectedValue={selectedOption}
            onChange={(selectedOption) => {
              setSelectedOption(selectedOption);
              filterByDate(
                { arrival: dateArrival, departure: dateDeparture },
                selectedOption,
                rooms
              );
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
                    filterByDate(
                      { arrival: date.target.value, departure: dateDeparture },
                      selectedOption,
                      rooms
                    );
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
                    filterByDate(
                      { arrival: dateArrival, departure: date.target.value },
                      selectedOption,
                      rooms
                    );
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
                      <td className="text-danger">
                        {room.status === "Available"
                          ? "Khả dụng"
                          : room.status === "NeedClean"
                            ? "Cần dọn"
                            : room.status === "Using"
                              ? "Đang sử dụng"
                              : "Đang chờ"}
                      </td>
                      <td>Khả dụng</td>
                      <td>Khả dụng</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleBooking(room)}
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
                        <td className="text-danger">
                          {room.status === "Available"
                            ? "Khả dụng"
                            : room.status === "NeedClean"
                              ? "Cần dọn"
                              : room.status === "Using"
                                ? "Đang sử dụng"
                                : "Đang chờ"}
                        </td>
                        <td>
                          {new Date(ticket.arrivalDate).toLocaleString(
                            "en-GB",
                            {
                              hour12: true,
                              hour: "numeric",
                              minute: "numeric",
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>
                          {new Date(ticket.departureDate).toLocaleString(
                            "en-GB",
                            {
                              hour12: true,
                              hour: "numeric",
                              minute: "numeric",
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleBooking(room)}
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

export default Booking;
