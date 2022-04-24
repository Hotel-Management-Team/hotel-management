import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState, useEffect } from "react";
import { ChargesContext } from "../../../contexts/ChargesContext";

const UpdateChargeModal = () => {
    const firstBlock = [1, 2, 3, 4, 5];
    // context
    const {
        chargeState: { charges, charge },
        getCharges,
        showUpdateChargeModal,
        setShowUpdateChargeModal,
        updateCharge,
        setShowToast,
    } = useContext(ChargesContext);

    const [updatedChargeData, setUpdatedChargeData] = useState(charge);

    useEffect(() => {
        if (charges.length === 0) {
            getCharges();
        }
    }, []);

    useEffect(() => {
        setUpdatedChargeData(charge);
    }, [charge]);

    const { name, FirstBlock, FirstBlockCharge, OvertimeCharge, OverNightCharge, DateCharge, SurCharge } = updatedChargeData;

    const onChangeUpdateChargeForm = (e) => {
        setUpdatedChargeData({
            ...updatedChargeData,
            [e.target.name]: e.target.value,
        });
    };
    const closeDialog = () => {
        setUpdatedChargeData(charge);
        setShowUpdateChargeModal(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { success, msg } = await updateCharge(updatedChargeData._id, updatedChargeData);
        setShowUpdateChargeModal(false);
        setShowToast({
            show: true,
            msg,
            type: success ? "success" : "danger",
        });
    };

    return (
        <Modal show={showUpdateChargeModal} onHide={closeDialog} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nhập giá cần sửa</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên loại phí"
                            name="name"
                            required
                            aria-describedby="title-help"
                            value={name}
                            onChange={onChangeUpdateChargeForm}
                        />
                    </Form.Group>
                    <Row className="align-items-center my-2">
                        <Form.Group as={Col}>
                            <Form.Select name="FirstBlock" onChange={onChangeUpdateChargeForm}>
                                <option value={null}> Chọn block đầu </option>
                                {firstBlock.map((item) => (
                                    <option key={item} value={FirstBlock}>
                                        {item}
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
                                value={FirstBlockCharge}
                                onChange={onChangeUpdateChargeForm}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="number"
                                placeholder="Nhập giá giờ sau"
                                name="OvertimeCharge"
                                required
                                aria-describedby="title-help"
                                value={OvertimeCharge}
                                onChange={onChangeUpdateChargeForm}
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
                                value={OverNightCharge}
                                onChange={onChangeUpdateChargeForm}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="number"
                                placeholder="Nhập giá ngày"
                                name="DateCharge"
                                required
                                aria-describedby="title-help"
                                value={DateCharge}
                                onChange={onChangeUpdateChargeForm}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="number"
                                placeholder="Nhập giá phụ thu quá giờ"
                                name="SurCharge"
                                required
                                aria-describedby="title-help"
                                value={SurCharge}
                                onChange={onChangeUpdateChargeForm}
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
                            FirstBlock < 0 ||
                            FirstBlockCharge < 0 ||
                            OvertimeCharge < 0 ||
                            OverNightCharge < 0 ||
                            DateCharge < 0 ||
                            SurCharge < 0
                        }
                    >
                        Cập nhập
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateChargeModal;
