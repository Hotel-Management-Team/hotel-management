import { useContext, useEffect, useState } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { CustomersContext } from "../../contexts/CustomersContext";
import { Form, Button, FormControl, Table, Modal } from "react-bootstrap";
import addIcon from "../../assets/plus-circle-fill.svg";

const CUSTOMER_TYPE = {
    "LOCAL": "local",
    "FOREIGN": "foreign"
};

export const CustomerModal = () => {

    const columns = ["#", "Tên khách hàng", "CMT", "Số điện thoại", "Email", "Địa chỉ", "Loại khách"];

    const { showCustomerModal, setShowCustomerModal, setShowAddCustomerModal, onChangeNewBookingForm } = useContext(BookingsContext);

    const { customerState: { customers }, getCustomers, customerDispatch } = useContext(CustomersContext);

    const [searchCustomer, setSearchCustomer] = useState("");

    useEffect(() => {
        getCustomers();
    }, [customers.length]);

    const closeDialog = () => {
        resetCustomerData();
    };

    const resetCustomerData = () => {
        setShowCustomerModal(false);
    };

    const handleAddCustomer = () => {
        closeDialog();
        setShowAddCustomerModal(true);
    };

    return (
        <>
            <Modal show={showCustomerModal} onHide={closeDialog} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="flex d-flex justify-content-center">
                        <FormControl className="text-center w-50"
                            label="Tên khách hàng"
                            type="search"
                            placeholder="Nhập Tên hoặc SĐT hoặc CMT khách hàng"
                            value={searchCustomer}
                            // onFocus={() => {
                            //     getCustomers();
                            // }}
                            onChange={(e) => {
                                setSearchCustomer(e.target.value);
                            }}
                            aria-label="Search"
                        />
                        <Button
                            onClick={() => handleAddCustomer()}
                            className="btn bg-white mx-3">
                            <img src={addIcon} alt="add" />
                        </Button>
                    </Form>
                    <div className="mt-4 mx-5 text-center">
                        <Table responsive bordered hover>
                            <thead>
                                <tr className="text-primary bg-light border border-info">
                                    {columns.map((_, index) => (
                                        <th key={index}>{columns[index]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="border border-info">
                                {
                                    customers.filter(
                                        (customer) =>
                                            customer.name.toLocaleLowerCase().includes(searchCustomer.toLocaleLowerCase()) ||
                                            customer.phone.toLocaleLowerCase().includes(searchCustomer.toLocaleLowerCase()) ||
                                            customer.ID.toLocaleLowerCase().includes(searchCustomer.toLocaleLowerCase())
                                    ).map((customer, index) => (

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.ID}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.type === CUSTOMER_TYPE.LOCAL ? "Nội địa" : "Nước ngoài"}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => onChangeNewBookingForm(customer, date, room)}
                                                >
                                                    Chọn
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
}; 