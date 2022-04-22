import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState, useEffect } from "react";
import { ChargesContext } from "../../../contexts/ChargesContext";

const AddChargeModal = () => {

    const firstBlock = [1, 2, 3, 4, 5];
    // context
    const { showAddChargeModal, setShowAddChargeModal, addCharge, setShowToast } =
        useContext(ChargesContext);

    const {
        chargeState: { charges, chargeLoading },
        getCharges,
    } = useContext(ChargesContext);

    useEffect(() => {
        if (charges.length === 0) {
            getCharges();
        }
    }, []);

    // state
    const [newCharge, setNewCharge] = useState({
        name: "",
        FirstBlock: null,
        FirstBlockCharge: null,
        OvertimeCharge: null,
        OverNightCharge: null,
        DateCharge: null,
        SurCharge: null,
    });

    const { name, FirstBlock, FirstBlockCharge, OvertimeCharge, OverNightCharge, DateCharge, SurCharge } = newCharge;

    const onChangeNewChargeForm = (e) => {
        setNewCharge({
            ...newCharge,
            [e.target.name]: e.target.value,
        });
    };
    const closeDialog = () => {
        resetAddChargeData();
    };
    const resetAddChargeData = () => {
        setNewCharge({
            name: "",
            FirstBlock: null,
            FirstBlockCharge: null,
            OvertimeCharge: null,
            OverNightCharge: null,
            DateCharge: null,
            SurCharge: null,
        });
        setShowAddChargeModal(false);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const { success, msg } = await addCharge(newCharge);
        setShowToast({ show: true, msg, type: success ? "success" : "danger" });
        resetAddChargeData();
    };
    return (
        <Modal show={showAddChargeModal} onHide={closeDialog} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nhập thông tin loại phí cần thêm</Modal.Title>
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
                            onChange={onChangeNewChargeForm}
                        />
                    </Form.Group>
                    <Row className="align-items-center my-2">
                        <Form.Group as={Col}>
                            <Form.Select name="FirstBlock" onChange={onChangeNewChargeForm}>
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
                                onChange={onChangeNewChargeForm}
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
                                onChange={onChangeNewChargeForm}
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
                                onChange={onChangeNewChargeForm}
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
                                onChange={onChangeNewChargeForm}
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
                                onChange={onChangeNewChargeForm}
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
                        Thêm mới
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal >
    );
};

export default AddChargeModal;
