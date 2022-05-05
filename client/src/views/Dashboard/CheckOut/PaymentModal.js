import { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../../contexts/InvoiceContext";
import { BookingsContext } from "../../../contexts/BookingsContext";
import { Form, Button, Modal, Row, Col, Badge } from "react-bootstrap";

export const PaymentModal = () => {
  const {
    invoiceState: { invoices, invoice, newInvoice },
    updateInvoice,
    showPaymentModal,
    setShowPaymentModal,
  } = useContext(InvoiceContext);

  const { setShowToast, checkoutBooking } = useContext(BookingsContext);

  const closeDialog = () => {
    resetInvoiceData();
  };

  const isBlock = () => {
    const arrival = new Date(invoice.ticket.departureDate);
    const departure = new Date(invoice.ticket.arrivalDate);

    return (
      arrival.getDate() === departure.getDate() &&
      arrival.getMonth() === departure.getMonth() &&
      arrival.getFullYear() === departure.getFullYear()
    );
  };

  const countDays = () => {
    const arrival = new Date(invoice.ticket.arrivalDate).getTime();
    const departure = new Date(invoice.ticket.departureDate).getTime();

    const diffTime = Math.abs(departure - arrival);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const extraHour = () => {
    const departure = new Date(invoice.ticket.departureDate).getTime();
    const today = new Date().getTime();
    const diffhour = Math.round((today - departure) / (1000 * 60 * 60));
    return diffhour > 0 ? diffhour : 0;
  };

  const resetInvoiceData = () => {
    setShowPaymentModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    invoice.total =
      (isBlock()
        ? invoice.room.charge.FirstBlockCharge +
          extraHour() * invoice.room.charge.OvertimeCharge -
          invoice.prepaid
        : countDays() * invoice.room.charge.DateCharge - invoice.prepaid) *
      (invoice.customer.type !== "local" ? 1.5 : 1);
    const { msg, success } = await checkoutBooking(invoice);
    setShowToast({
      show: true,
      msg,
      type: success ? "success" : "danger",
    });
    resetInvoiceData();
  };

  return (
    <>
      <Modal show={showPaymentModal} onHide={closeDialog} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Hoá Đơn Thanh Toán</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row className="align-items-center my-2">
              <Form.Label column sm={4}>
                Tên phòng: {invoice.room.name}
              </Form.Label>
              <Form.Label column sm={4}>
                Tên khách hàng: {invoice.customer.name}
              </Form.Label>
              <Form.Label column sm={4}>
                Địa chỉ khách hàng: {invoice.customer.address}
              </Form.Label>
            </Row>
            <Row className="align-items-center my-2">
              <Form.Label column sm={4}>
                <h4>
                  {isBlock() ? (
                    <Badge variant="success">
                      Số giờ: {invoice.room.charge.FirstBlock}
                    </Badge>
                  ) : (
                    <Badge variant="danger">Số ngày: {countDays()} </Badge>
                  )}
                </h4>
              </Form.Label>
              <Form.Label column sm={4}>
                <h4>
                  {isBlock() ? (
                    <Badge variant="success">
                      Đơn giá: {invoice.room.charge.FirstBlockCharge}/
                      <small>{invoice.room.charge.FirstBlock}h</small>
                    </Badge>
                  ) : (
                    <Badge variant="danger">
                      {" "}
                      Đơn giá: {invoice.room.charge.DateCharge}/
                      <small>ngày</small>
                    </Badge>
                  )}
                </h4>
              </Form.Label>
              <Form.Label column sm={4}>
                <h4>
                  <Badge bg="secondary" variant="danger">
                    Quá giờ trả phòng: {extraHour()}h
                  </Badge>
                </h4>
              </Form.Label>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {" "}
                  <h4 className="text-info">
                    Trả trước{" : "}
                    <Badge bg="info"> {invoice.prepaid} VNĐ</Badge>
                  </h4>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {" "}
                  <h4 className="text-info">
                    Phí quá giờ{" : "}
                    <Badge bg="info">
                      {" "}
                      {isBlock()
                        ? extraHour() * invoice.room.charge.OvertimeCharge
                        : extraHour() * invoice.room.charge.SurCharge}{" "}
                      VNĐ
                    </Badge>
                  </h4>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {" "}
                  <h3 className="text-secondary">
                    Tổng Tiền{" "}
                    <small>
                      {" "}
                      {invoice.customer.type !== "local"
                        ? "(khách nước ngoài x1.5)"
                        : " "}
                    </small>{" "}
                    {" : "}
                    <Badge bg="secondary">
                      {(isBlock()
                        ? invoice.room.charge.FirstBlockCharge +
                          extraHour() * invoice.room.charge.OvertimeCharge -
                          invoice.prepaid
                        : countDays() * invoice.room.charge.DateCharge -
                          invoice.prepaid) *
                        (invoice.customer.type !== "local" ? 1.5 : 1)}
                      VNĐ
                    </Badge>
                  </h3>
                </Form.Label>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex align-content-between">
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  onSubmit(e);
                  closeDialog();
                }}
              >
                Thanh Toán
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
