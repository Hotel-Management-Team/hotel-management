import React from "react";
import { useContext, useState, useEffect } from "react";
import { ChargeContext } from "../../../contexts/ChargeContext";
import { Spinner, Table, Button } from "react-bootstrap";
import EditIcon from "../../../assets/pencil.svg";

const columns = ["#", "Tên loại phí", "Block đầu", "Giá block đầu", "Giá giờ sau", "Giá qua đêm", "Giá ngày", "Giá phụ thu quá giờ"];

const Charge = () => {

    const {
        chargeState: { chargeLoading, charges },
        getCharges,
    } = useContext(ChargeContext);

    useEffect(() => {
        if (charges.length === 0) {
            getCharges();
        }
    }, []);


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
                                    <Button className="action-button border-0" onClick={() => {
                                        console.log("edit");
                                    }}>
                                        <img src={EditIcon} alt="edit" width="24" height="24" />
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        </>
    );
}
export default Charge;