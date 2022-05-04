import { useContext, useEffect, useState } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";

export const InvoiceModal = () => {

    const { showInvoiceModal, setShowInvoiceModal, customer, room, dateArrival, dateDeparture, total, date } = useContext(BookingsContext);

    const closeDialog = () => {
        resetInvoiceData();
    };

    const resetInvoiceData = () => {
        setShowInvoiceModal(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submit");
    };

    return (
        <>
            {/* showInvoiceModal */}
            <Modal show={showInvoiceModal} onHide={closeDialog} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Hoá đơn</Modal.Title>
                </Modal.Header>
                {/* <Form > onSubmit={onSubmit}> */}
                <Form>
                    <Modal.Body>
                        <Row className="align-items-center my-2">
                            <Form.Label column sm={4}>
                                Tên phòng: {room.name}
                            </Form.Label>
                            <Form.Label column sm={4}>
                                Tên khách hàng: {customer.name}
                            </Form.Label>
                            <Form.Label column sm={4}>
                                Ngày đến: {dateArrival}
                            </Form.Label>
                            <Form.Label column sm={4}>
                                Ngày rời: {dateDeparture}
                            </Form.Label>
                            <Form.Label column sm={4}>
                                Số ngày: {date}
                            </Form.Label>
                            <Form.Label column sm={4}>
                                Giá theo ngày: {room.price}
                            </Form.Label>

                        </Row>
                        <Row className="align-items-center my-2 text-danger">
                            <Form.Group as={Col}>
                                <Form.Label>Tổng tiền: { } VNĐ</Form.Label>
                            </Form.Group>
                        </Row>
                        <Row className="align-items-center my-2">
                            <Form.Group as={Col}>
                                <Form.Label>Tiền trả trước (VNĐ)</Form.Label>
                                <Form.Control value={0.3} type="number" placeholder="Nhập tiền trả trước" />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex align-content-between">
                            <Button variant="primary" type="submit" onClick={() => {
                                onSubmit();
                                closeDialog();
                            }}>
                                Xác nhận
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
}; 