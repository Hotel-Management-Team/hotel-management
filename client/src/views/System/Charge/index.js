import React from "react";
import { useContext, useEffect, useState } from "react";
import { ChargesContext } from "../../../contexts/ChargesContext";
import { Spinner, Table, Button, Toast, Modal } from "react-bootstrap";
import EditIcon from "../../../assets/pencil.svg";
import DeleteIcon from "../../../assets/trash.svg";
import AddChargeModal from "./AddChargeModal";
import UpdateChargeModal from "./UpdateChargeModal";
import ControlBar from "../../../components/common/ControlBar";

const columns = ["#", "Tên loại phí", "Block đầu", "Giá block đầu", "Giá giờ sau", "Giá qua đêm", "Giá ngày", "Giá phụ thu quá giờ", "Thay đổi"];

const Charge = () => {

    const {
        chargeState: { chargeLoading, charges, charge },
        getCharges,
        findCharge,
        setShowAddChargeModal,
        setShowUpdateChargeModal,
        showToast: { show, msg, type },
        setShowToast,
        deleteCharge,
    } = useContext(ChargesContext);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const ModalDelete = () => {
        return (
            <Modal
                show={showDeleteConfirm}
                onHide={() => {
                    setShowDeleteConfirm(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xoá cách tính tiền</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Bạn có muốn xoá không ?</h5>
                    {/* {children} */}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={async () => {
                            const { success, msg } = await deleteCharge(charge._id);
                            setShowToast({
                                show: true,
                                msg,
                                type: success ? "success" : "danger",
                            });
                            setShowDeleteConfirm(false);
                        }}
                    >
                        YES
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const choosePost = (id) => {
        findCharge(id);
        setShowUpdateChargeModal(true);
    };

    useEffect(() => {
        if (charges.length === 0) {
            getCharges();
        }
    }, []);

    // handle add charge modal

    if (chargeLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="danger" />
            </div>
        );
    }

    return (
        <>
            <ControlBar
                Link="/system-management"
                onClickAdd={setShowAddChargeModal.bind(this, true)}
            />
            <div className="mt-5 mx-5 text-center">
                <Table responsive bordered hover>
                    <thead>
                        <tr className="text-primary bg-light border border-info">
                            {columns.map((_, index) => (
                                <th key={index}>{columns[index]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="border border-info">
                        {charges.map((charge, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{charge.name}</td>
                                <td>{charge.FirstBlock}</td>
                                <td>{charge.FirstBlockCharge}</td>
                                <td>{charge.OvertimeCharge}</td>
                                <td>{charge.OverNightCharge}</td>
                                <td>{charge.DateCharge}</td>
                                <td>{charge.SurCharge}</td>
                                <td>
                                    <Button className="border-0 bg-transparent"
                                        onClick={choosePost.bind(this, charge._id)}
                                    >
                                        <img src={EditIcon} alt="edit" width="24" height="24" />
                                    </Button>
                                    <Button className="border-0 bg-transparent"
                                        onClick={() => {
                                            findCharge(charge._id);
                                            setShowDeleteConfirm(true);
                                        }}
                                    >
                                        <img src={DeleteIcon} alt="edit" width="24" height="24" />
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
            {<AddChargeModal />}
            {charge !== null && < UpdateChargeModal />}
            {charge !== null && <ModalDelete />}
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
}

export default Charge;