import { Form, Button, Row, Col, FormControl, Modal, Toast } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { CustomersContext } from "../../contexts/CustomersContext";

const CUSTOMER_TYPE = {
    "LOCAL": "local",
    "FOREIGN": "foreign"
};

export const AddCustomerModal = () => {

    const { showAddCustomerModal, setShowAddCustomerModal, setShowCustomerModal } = useContext(BookingsContext);

    const {
        addCustomer,
        showToast: { show, msg, type },
        setShowToast,
    } = useContext(CustomersContext);

    const [newCustomer, setNewCustomer] = useState({
        name: "",
        ID: "",
        phone: "",
        email: "",
        address: "",
        typeCustomer: "",
    });

    const { name, ID, phone, email, address, typeCustomer } = newCustomer;

    const onChangeNewCustomerForm = (e) => {
        setNewCustomer({
            ...newCustomer,
            [e.target.name]: e.target.value,
        });
    };

    const resetCustomerData = () => {
        setNewCustomer({
            name: "",
            ID: "",
            phone: "",
            email: "",
            address: "",
            typeCustomer: "",
        });
        setShowAddCustomerModal(false);
        setShowCustomerModal(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { success, msg } = await addCustomer(newCustomer);
        setShowToast({ show: true, msg, type: success ? "success" : "danger" });
        if (success) {
            resetCustomerData();
        }

    };

    return (
        <>
            <Toast
                show={show}
                style={{ position: "fixed", bottom: "10%", right: "10px" }}
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
            <Modal show={showAddCustomerModal} onHide={resetCustomerData} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Th??m kh??ch h??ng</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Row className="align-items-center my-2">
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="text"
                                    placeholder="T??n kh??ch h??ng"
                                    name="name"
                                    required
                                    value={name}
                                    onChange={onChangeNewCustomerForm}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Select name="typeCustomer" onChange={onChangeNewCustomerForm}>
                                    <option value={null}>Ch???n lo???i kh??ch h??ng</option>
                                    <option value={CUSTOMER_TYPE.LOCAL}> Kh??ch h??ng N???i ?????a </option>
                                    <option value={CUSTOMER_TYPE.FOREIGN}> Kh??ch h??ng Qu???c t??? </option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="align-items-center my-2">
                            <Form.Group as={Col}>
                                <Form.Control
                                    onChange={onChangeNewCustomerForm}
                                    required
                                    value={phone}
                                    name="phone"
                                    type="text"
                                    placeholder="S??? ??i???n tho???i"
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    onChange={onChangeNewCustomerForm}
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="align-items-center my-2">
                            <Form.Group as={Col}>
                                <Form.Control
                                    onChange={onChangeNewCustomerForm}
                                    name="ID"
                                    type="text"
                                    placeholder="S??? CMT/CCCD"
                                    value={ID}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    onChange={onChangeNewCustomerForm}
                                    name="address"
                                    type="text"
                                    placeholder="?????a ch???"
                                    value={address}
                                />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={
                                name === "" ||
                                typeCustomer === "" ||
                                phone === "" ||
                                email === "" ||
                                ID === "" ||
                                address === ""
                            }
                        >
                            Th??m m????i
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
};
