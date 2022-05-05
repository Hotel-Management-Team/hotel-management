import React from "react";
import BackStackButton from "../../../components/common/BackStackButton";
import { Table, Badge, Button, Toast } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { BookingsContext } from "../../../contexts/BookingsContext";
import { InvoiceContext } from "../../../contexts/InvoiceContext";
import { PaymentModal } from "./PaymentModal";

const CheckOut = () => {
  const {
    bookingsState: { usingBookings },
    getUsingBookings,
    showToast: { show, msg, type },
    setShowToast,
  } = useContext(BookingsContext);

  const {
    invoiceState: { invoices, invoice },
    getInvoicesPaid,
    getInvoicesUnpaid,
    findInvoice,
    setShowPaymentModal,
  } = useContext(InvoiceContext);

  useEffect(() => {
    getUsingBookings();
    setShowToast({ show: false, msg: "", type: "" });
    getInvoicesUnpaid();
  }, []);

  return (
    <>
      <BackStackButton />
      {invoice !== null && invoice !== undefined && <PaymentModal />}
      <div className="mt-3 mx-5 text-center">
        <h3>
          {" "}
          <strong>Trả phòng</strong>
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
            {usingBookings.length > 0 ? (
              usingBookings.map((ticket, index) => (
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
                        findInvoice(ticket);
                        setShowPaymentModal(true);
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
                    Không có phòng nào đang sử dụng
                  </h3>
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

export default CheckOut;
