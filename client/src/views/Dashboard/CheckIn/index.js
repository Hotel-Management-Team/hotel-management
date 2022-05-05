import React from "react";
import BackStackButton from "../../../components/common/BackStackButton";
import { Table, Badge, Button, Toast } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { BookingsContext } from "../../../contexts/BookingsContext";

const CheckIn = () => {
  const {
    bookingsState: { waitingBookings },
    getWaitingBookings,
    checkinBooking,
    showToast: { show, msg, type },
    setShowToast,
  } = useContext(BookingsContext);

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    getWaitingBookings();
  }, []);


  return (
    <>
      <BackStackButton />

      <div className="mt-3 mx-5 text-center">
        <h3>
          <strong>Nhận phòng</strong>
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
            {waitingBookings.length > 0 ? (
              waitingBookings.map((ticket, index) => (
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
                    <Badge bg="danger" className="p-2">
                      {ticket.room.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={async () => {
                        const { msg, success } = await checkinBooking(
                          ticket._id
                        );
                        setShowToast({
                          show: true,
                          msg,
                          type: success ? "success" : "danger",
                        });
                      }}
                    >
                      Nhận phòng
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <h3 className="text-center">Không có phòng trống</h3>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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

export default CheckIn;
