import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";
import { Spinner, Table, Button } from "react-bootstrap";
import EditIcon from "../../../assets/pencil.svg";

const columns = ["#", "Tên loại phòng", "Mô tả", "Chỉnh sửa"];

const RoomType = () => {

    const {
        roomTypeState: { roomTypeLoading, roomTypes },
        getRoomTypes,
    } = useContext(RoomTypeContext);

    useEffect(() => {
        if (roomTypes.length === 0) {
            getRoomTypes();
        }
    }, []);


    if (roomTypeLoading) {
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
                        {roomTypes.map((roomType, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{roomType.name}</td>
                                <td>{roomType.description}</td>
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
export default RoomType;