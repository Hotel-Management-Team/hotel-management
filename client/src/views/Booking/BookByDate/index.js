import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../../../contexts/RoomsContext";
import { BookingsContext } from "../../../contexts/BookingsContext";
import { CustomersContext } from "../../../contexts/CustomersContext";
import { Spinner, Form, Col, Row, Toast } from "react-bootstrap";
import { CustomerModal } from "../CustomerModal";
import { AddCustomerModal } from "../AddCustomerModal";
import { TableBooking } from "../TableBooking";
import { InvoiceModal } from "../InvoiceModal";

const BookByDate = () => {
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
    dateArrival,
    setDateArrival,
    dateDeparture,
    setDateDeparture,
    setRoomId
  } = useContext(BookingsContext);

  const {
    customerState: { customers },
  } = useContext(CustomersContext);



  useEffect(() => {
    getRoomsTickets();
  }, [rooms.length]);

  const handleBooking = (room) => {
    setRoomId(room._id);
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
      {<InvoiceModal />}

      <div className="container d-flex flex-column p-4">
        <Form className="p-3">
          <Row>
            <Col>
              <Form.Group controlId="arrival">
                <Form.Label>Chọn ngày đến</Form.Label>
                <Form.Control
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                  name="arrival"
                  value={dateArrival}
                  format="yyyy-MM-dd"
                  onChange={(date) => {
                    setDateArrival(date.target.value);
                    filterByDate(
                      { arrival: date.target.value, departure: dateDeparture },
                      rooms
                    );
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="departure">
                <Form.Label>Chọn ngày rời</Form.Label>
                <Form.Control
                  min={dateArrival.split("T")[0]}
                  type="date"
                  name="departure"
                  value={dateDeparture}
                  format="yyyy-MM-dd"
                  onChange={(date) => {
                    setDateDeparture(date.target.value);
                    filterByDate(
                      { arrival: dateArrival, departure: date.target.value },
                      rooms
                    );
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <div className="p-3">
          {<TableBooking bookings={bookings} handleBooking={handleBooking} />}
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

export default BookByDate;
