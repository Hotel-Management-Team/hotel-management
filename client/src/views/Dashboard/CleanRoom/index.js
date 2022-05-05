import React from "react";
import BackStackButton from "../../../components/common/BackStackButton";
import { Table, Badge, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { BookingsContext } from "../../../contexts/BookingsContext";

const CleanRoom = () => {
  const {
    bookingsState: { needCleanBookings },
    getNeedCleanBookings,
  } = useContext(BookingsContext);

  useEffect(() => {
    getNeedCleanBookings();
  }, []);

  return (
    <>
      <BackStackButton />
      <div className="mt-3 mx-5 text-center">
        <h3>
          {" "}
          <strong>Dọn dẹp phòng</strong>
        </h3>
        <Table responsive bordered hover className="mt-3">
          <thead className="text-primary bg-light border border-info">
            <tr>
              <th>#</th>
              <th>Tên phòng</th>
              <th>Khách hàng</th>
              <th>Ngày nhận phòng</th>
              <th>Ngày trả phòng</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {needCleanBookings.length > 0 ? (
              needCleanBookings.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td>{index + 1}</td>
                  <td>{ticket.room.name}</td>
                  <td>{ticket.customer.name}</td>
                  <td>
                    {new Date(ticket.arrivalDate).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    {new Date(ticket.departureDate).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    <Badge bg="success" className="p-2">
                      {ticket.room.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => {
                        console.log("booking");
                      }}
                    >
                      Trả phòng
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <h3 className="text-center">
                    Không có phòng nào cần dọn dẹp
                  </h3>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CleanRoom;
