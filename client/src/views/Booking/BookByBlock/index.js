import React from "react";
import { Button, Table, Badge } from "react-bootstrap";
import { useContext, useState, useEffect, useRef } from "react";
import { BookingsContext } from "../../../contexts/BookingsContext";
import { CustomerModal } from "../CustomerModal";
import { AddCustomerModal } from "../AddCustomerModal";
import { RoomsContext } from "../../../contexts/RoomsContext";
import { InvoiceContext } from "../../../contexts/InvoiceContext";
import { InvoiceModal } from "../InvoiceModal";
import BackStackButton from "../../../components/common/BackStackButton";

const BookByBlock = () => {
  const {
    bookingsState: { bookingsByBlock },
    getBookByBlock,
    setRoom,
    room,
    setShowCustomerModal,
  } = useContext(BookingsContext);

  const {
    roomsState: { rooms, roomLoading },
    getRoomsTickets,
  } = useContext(RoomsContext);

  const {
    invoiceState: { newInvoice },
  } = useContext(InvoiceContext);

  useEffect(() => {
    getBookByBlock();
  }, []);

  useEffect(() => {
    getRoomsTickets();
  }, []);

  const handleBooking = (room) => {
    setRoom(room);
    setShowCustomerModal(true);
  };

  return (
    <>
      <BackStackButton />
      {room !== undefined && <CustomerModal />}
      <AddCustomerModal />
      {newInvoice !== null && newInvoice !== undefined && <InvoiceModal />}
      <div className="mt-5 mx-5 text-center">
        <Table responsive bordered hover className="mt-3">
          <thead className="text-primary bg-light border border-info">
            <tr>
              <th>#</th>
              <th>Tên phòng</th>
              <th>Loại phòng</th>
              <th>Loại giá</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {bookingsByBlock.length > 0 ? (
              bookingsByBlock.map((room, index) => (
                <tr key={room._id}>
                  <td>{index + 1}</td>
                  <td>{room.name}</td>
                  <td>{room.roomtype.name}</td>
                  <td>
                    {room.charge.name}

                    <Badge bg="secondary" className="mx-2 p-2">
                      {room.charge.FirstBlockCharge}/
                      <small>{room.charge.FirstBlock}h</small>
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      className="p-2"
                      bg={room.status === "Available" ? "info" : "danger"}
                    >
                      {room.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => {
                        handleBooking(room);
                      }}
                    >
                      Đặt ngay
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <h3 className="text-center">Không có phòng trống</h3>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BookByBlock;
