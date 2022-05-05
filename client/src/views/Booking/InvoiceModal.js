import { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../contexts/InvoiceContext";
import { Form, Button, Modal, Row, Col, Badge } from "react-bootstrap";

export const InvoiceModal = () => {
  const {
    invoiceState: { invoices, newInvoice },
    showInvoiceModal,
    setShowInvoiceModal,
    updateInvoice,
  } = useContext(InvoiceContext);

  const closeDialog = () => {
    resetInvoiceData();
  };

  const [prePaid, setPrePaid] = useState(false);
  const [prePaidAmount, setPrePaidAmount] = useState(0);
  //   console.log(prePaidAmount);

  const resetInvoiceData = () => {
    setShowInvoiceModal(false);
  };

  const isBlock = () => {
    const arrival = new Date(newInvoice.ticket.departureDate);
    const departure = new Date(newInvoice.ticket.arrivalDate);

    return (
      arrival.getDate() === departure.getDate() &&
      arrival.getMonth() === departure.getMonth() &&
      arrival.getFullYear() === departure.getFullYear()
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (prePaid) {
      updateInvoice({
        ...newInvoice,
        prepaid: prePaidAmount,
      });
    }
    setShowInvoiceModal(false);
  };

  return (
    <>
      <Modal show={showInvoiceModal} onHide={closeDialog} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Hoá đơn</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row className="align-items-center my-2">
              <Form.Label column sm={4}>
                Tên phòng: {newInvoice.ticket.room.name}
              </Form.Label>
              <Form.Label column sm={4}>
                Tên khách hàng: {newInvoice.ticket.customer.name}
              </Form.Label>
              {isBlock() ? (
                <>
                  <Form.Label column sm={4}></Form.Label>
                  <Form.Label column sm={4}>
                    Số giờ:{" "}
                    <Badge variant="primary">
                      {newInvoice.charge.FirstBlock} giờ
                    </Badge>
                  </Form.Label>
                  <Form.Label column sm={4}>
                    Giá giờ sau:{" "}
                    <Badge bg="secondary">
                      {newInvoice.charge.OvertimeCharge}/<small>giờ</small>
                    </Badge>
                  </Form.Label>

                  <Form.Label column sm={4}></Form.Label>
                </>
              ) : (
                <>
                  <Form.Label column sm={4}>
                    Ngày đến: {newInvoice.ticket.arrivalDate.split("T")[0]}
                  </Form.Label>
                  <Form.Label column sm={4}>
                    Số ngày:{" "}
                    <Badge variant="primary">
                      {new Date(newInvoice.ticket.departureDate).getDate() -
                        new Date(newInvoice.ticket.arrivalDate).getDate()}{" "}
                      ngày
                    </Badge>
                  </Form.Label>
                  <Form.Label column sm={4}>
                    Giá theo ngày:{" "}
                    <Badge bg="secondary">
                      {newInvoice.charge.DateCharge}/<small>ngày</small>
                    </Badge>
                  </Form.Label>

                  <Form.Label column sm={4}>
                    Ngày rời: {newInvoice.ticket.departureDate.split("T")[0]}
                  </Form.Label>
                </>
              )}
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {" "}
                  <h3 className="text-secondary">
                    Tổng Tiền{" : "}
                    <Badge bg="secondary">{newInvoice.total} VNĐ</Badge>
                  </h3>
                </Form.Label>
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Trả trước"
                checked={prePaid}
                onChange={(e) => {
                  setPrePaid(e.target.checked);
                }}
              />
            </Form.Group>
            {prePaid && (
              <Row className="align-items-center my-2">
                <Form.Group as={Col}>
                  <Form.Label>Tiền trả trước (VNĐ)</Form.Label>
                  <Form.Control
                    value={prePaidAmount}
                    type="number"
                    onChange={(e) => {
                      setPrePaidAmount(e.target.value);
                    }}
                    placeholder="Nhập tiền trả trước"
                  />
                </Form.Group>
              </Row>
            )}
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
                Xác nhận
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
