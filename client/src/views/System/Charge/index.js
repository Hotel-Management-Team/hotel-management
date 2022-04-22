import React from "react";
import { useContext, useEffect } from "react";
import { ChargesContext } from "../../../contexts/ChargesContext";
import { Spinner, Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditIcon from "../../../assets/pencil.svg";
import addIcon from "../../../assets/plus-circle-fill.svg";
import DeleteIcon from "../../../assets/trash.svg";
import AddChargeModal from "./AddChargeModal";
const columns = ["#", "Tên loại phí", "Block đầu", "Giá block đầu", "Giá giờ sau", "Giá qua đêm", "Giá ngày", "Giá phụ thu quá giờ", "Thay đổi"];

const Charge = () => {

    const {
        chargeState: { chargeLoading, charges },
        getCharges,
        setShowAddChargeModal,
    } = useContext(ChargesContext);

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
                                    // onClick={() =>
                                    //     //editBooking(index)
                                    // }
                                    >
                                        <img src={EditIcon} alt="edit" width="24" height="24" />
                                    </Button>
                                    <Button className="border-0 bg-transparent"
                                    //  onClick={() => 
                                    // deleteBooking(index)
                                    // }
                                    >
                                        <img src={DeleteIcon} alt="edit" width="24" height="24" />
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
            <div>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-top">
                            <strong>Thêm mới</strong>
                        </Tooltip>
                    }
                >
                    <Button
                        className="btn-floating border-0 bg-white"
                        onClick={setShowAddChargeModal.bind(this, true)}
                    >
                        <img src={addIcon} alt="add-post" width="60" height="60" />
                    </Button>
                </OverlayTrigger>
            </div>
            <AddChargeModal />
        </>
    );
}
export default Charge;