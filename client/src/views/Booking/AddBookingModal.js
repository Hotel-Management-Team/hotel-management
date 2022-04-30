import Modal from "react-bootstrap/Modal";
import { useContext, useEffect } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { CustomersContext } from "../../contexts/CustomersContext";
import { Form, Button, Row, Col } from "react-bootstrap";

export const AddBookingModal = () => {

    const { showAddBookingModal, setShowAddBookingModal } =
        useContext(BookingsContext);
    const { customerState: { customers }, getCustomers } = useContext(CustomersContext);

    useEffect(() => {
        if (customers.length === 0) {
            getCustomers();
        }
    }, []);

    const onChangeNewBookingForm = (e) => {
        // setNewRoom({
        //     ...newRoom,
        //     [e.target.name]: e.target.value,
        // });
    };

    const closeDialog = () => {
        resetAddBookingData();
    };

    const resetAddBookingData = () => {
        // setNewCharge({
        //     name: "",
        //     FirstBlock: "",
        //     FirstBlockCharge: "",
        //     OvertimeCharge: "",
        //     OverNightCharge: "",
        //     DateCharge: "",
        //     SurCharge: "",
        // });
        setShowAddBookingModal(false);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        // const { success, msg } = await addBooking(newBooking);
        //  setShowToast({ show: true, msg, type: success ? "success" : "danger" });
        resetAddBookingData();
    };
    return (
        <>
            <Modal show={showAddBookingModal} onHide={closeDialog} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Nhập thông tin booking</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        {/* <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên loại phí"
                                name="name"
                                required
                                aria-describedby="title-help"
                                value={name}
                                onChange={onChangeNewBookingForm}
                            />
                        </Form.Group> */}
                        <Row className="align-items-center my-2">
                            <Form.Group as={Col}>
                                <Form.Select name="Customer" onChange={onChangeNewBookingForm}>
                                    <option value={null}> Chọn khách hàng </option>
                                    {customers.map((item) => (
                                        <option key={item} value={item}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập giá block đầu"
                                    name="FirstBlockCharge"
                                    required
                                    aria-describedby="title-help"
                                    // value={FirstBlockCharge}
                                    onChange={onChangeNewBookingForm}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập giá giờ sau"
                                    name="OvertimeCharge"
                                    required
                                    aria-describedby="title-help"
                                    //  value={OvertimeCharge}
                                    onChange={onChangeNewBookingForm}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="align-items-center my-2">
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập giá qua đêm"
                                    name="OverNightCharge"
                                    required
                                    aria-describedby="title-help"
                                    //   value={OverNightCharge}
                                    onChange={onChangeNewBookingForm}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập giá ngày"
                                    name="DateCharge"
                                    required
                                    aria-describedby="title-help"
                                    // value={DateCharge}
                                    onChange={onChangeNewBookingForm}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập giá phụ thu quá giờ"
                                    name="SurCharge"
                                    required
                                    aria-describedby="title-help"
                                    // value={SurCharge}
                                    onChange={onChangeNewBookingForm}
                                />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type="submit"
                        //  disabled={
                        // name === "" ||
                        // FirstBlock < 0 ||
                        // FirstBlockCharge < 0 ||
                        // OvertimeCharge < 0 ||
                        // OverNightCharge < 0 ||
                        // DateCharge < 0 ||
                        // SurCharge < 0
                        //   }
                        >
                            Thêm mới
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
}; 