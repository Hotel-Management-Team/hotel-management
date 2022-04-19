import React from "react";
import { useContext, useState, useEffect } from "react";
import { BookingsContext } from "../contexts/BookingsContext";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const columns = ["#", "Tên khách hàng", "Tên phòng", "Ngày đến", "Giá phòng"];

const Bookings = () => {
  const {
    bookingsState: { bookingsLoading, bookings },
    getBookings,
  } = useContext(BookingsContext);

  useEffect(() => {
    if (bookings.length === 0) {
      getBookings();
    }
  }, []);

  const navigate = useNavigate();

  if (bookingsLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 mx-5 text-center">
        <Table responsive bordered hover>
          <thead>
            <tr className="text-primary bg-light border border-info">
              {columns.map((_, index) => (
                <th key={index}>{columns[index]}</th>
              ))}
            </tr>
          </thead>
          <tbody className="border border-info">
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.customerName}</td>
                <td>{booking.roomName}</td>
                <td>{booking.startDate}</td>
                <td>{booking.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default Bookings;
