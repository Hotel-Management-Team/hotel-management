import { useContext, useEffect, useState } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { CustomersContext } from "../../contexts/CustomersContext";
import { Form, Button, FormControl, Table, Modal } from "react-bootstrap";
import addIcon from "../../assets/plus-circle-fill.svg";

const CUSTOMER_TYPE = {
    "LOCAL": "local",
    "FOREIGN": "foreign"
};

export const InvoiceModal = () => {

    const { showInvoiceModal, setShowInvoiceModal } = useContext(BookingsContext);

    const closeDialog = () => {
        resetInvoiceData();
    };

    const resetInvoiceData = () => {
        setShowInvoiceModal(false);
    };

    return (
        <>
            <Modal show={showInvoiceModal} onHide={closeDialog} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Hoá đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal >
        </>
    );
}; 