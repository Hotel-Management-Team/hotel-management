import { useContext, useEffect, useState } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { CustomersContext } from "../../contexts/CustomersContext";
import { InvoiceContext } from "../../contexts/InvoiceContext";
import { Form, Button, FormControl, Table, Modal } from "react-bootstrap";
import addIcon from "../../assets/plus-circle-fill.svg";
import { paymentByDate, paymentByBlock } from "../../utils/payment";

const CUSTOMER_TYPE = {
  LOCAL: "local",
  FOREIGN: "foreign",
};

export const CustomerModal = () => {
  const columns = [
    "#",
    "Tên khách hàng",
    "CMT",
    "Số điện thoại",
    "Email",
    "Địa chỉ",
    "Loại khách",
  ];

  const {
    bookingsState: { bookingsByDate },
    showCustomerModal,
    setShowCustomerModal,
    setShowAddCustomerModal,
    addBooking,
    dateArrival,
    dateDeparture,
    room,
    setShowToast,
    customer,
    setCustomer,
    setDate,
  } = useContext(BookingsContext);

  const {
    customerState: { customers },
    getCustomers,
  } = useContext(CustomersContext);

  const { addInvoice, setShowInvoiceModal } = useContext(InvoiceContext);

  const [searchCustomer, setSearchCustomer] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const onConfrimNewBooking = async (
    customer,
    room,
    arrivalDate,
    departureDate,
    isBlock
  ) => {
    const addNewBooking = await addBooking(
      customer._id,
      room._id,
      arrivalDate,
      departureDate
    );
    setDate(
      (new Date(dateDeparture) - new Date(dateArrival)) / (1000 * 60 * 60 * 24)
    );

    let total = 1;
    if (isBlock) {
      total = paymentByBlock(
        arrivalDate,
        departureDate,
        room.charge.OvertimeCharge,
        room.charge.FirstBlockCharge,
        customer.type
      );
    } else {
      total = paymentByDate(
        dateArrival,
        dateDeparture,
        room.charge.SurCharge,
        room.charge.DateCharge,
        customer.type
      );
    }

    if (addNewBooking.success) {
      const addNewInvoice = await addInvoice({
        total,
        ticket: addNewBooking.data,
      });
      if (addNewInvoice.success) {
        setShowInvoiceModal(true);
        setShowCustomerModal(false);
        setShowToast({
          show: true,
          msg: addNewInvoice.msg,
          type: addNewInvoice.success ? "success" : "danger",
        });
      }
    } else {
      setShowToast({
        show: true,
        msg: addNewBooking.msg,
        type: addNewBooking.success ? "success" : "danger",
      });
    }
  };

  const closeDialogConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Modal show={showConfirmModal} onHide={closeDialogConfirmModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thuê phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {window.location.href.includes("bookbydate") ? (
            <>
              <strong>{customer.name}</strong> sẽ thuê phòng{" "}
              <strong>{room.name}</strong> từ ngày{" "}
              <strong>{dateArrival}</strong> đến ngày{" "}
              <strong>{dateDeparture}</strong>
            </>
          ) : (
            <>
              <strong>{customer.name}</strong> sẽ thuê phòng{" "}
              <strong>{room.name}</strong> trong{" "}
              {room.charge ? (
                <>
                  <strong>{room.charge.FirstBlock} giờ </strong>
                  với giá <strong>{room.charge.FirstBlockCharge} VNĐ </strong>
                </>
              ) : (
                <> </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              if (window.location.href.includes("bookbydate")) {
                const isBlock = false;
                onConfrimNewBooking(
                  customer,
                  room,
                  dateArrival,
                  dateDeparture,
                  isBlock
                );
              } else {
                const isBlock = true;
                onConfrimNewBooking(
                  customer,
                  room,
                  new Date(),
                  new Date().setTime(
                    new Date().getTime() +
                      room.charge.FirstBlock * 60 * 60 * 1000
                  ),
                  isBlock
                );
              }

              setShowConfirmModal(false);
            }}
          >
            YES
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCustomerModal} onHide={closeDialog} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="flex d-flex justify-content-center">
            <FormControl
              className="text-center w-50"
              label="Tên khách hàng"
              type="search"
              placeholder="Nhập Tên hoặc SĐT hoặc CMT khách hàng"
              value={searchCustomer}
              onChange={(e) => {
                setSearchCustomer(e.target.value);
              }}
              aria-label="Search"
            />
            <Button
              onClick={() => handleAddCustomer()}
              className="btn bg-white mx-3"
            >
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
                {customers
                  .filter(
                    (customer) =>
                      customer.name
                        .toLocaleLowerCase()
                        .includes(searchCustomer.toLocaleLowerCase()) ||
                      customer.phone
                        .toLocaleLowerCase()
                        .includes(searchCustomer.toLocaleLowerCase()) ||
                      customer.ID.toLocaleLowerCase().includes(
                        searchCustomer.toLocaleLowerCase()
                      )
                  )
                  .map((customer, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{customer.name}</td>
                      <td>{customer.ID}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>{customer.address}</td>
                      <td>
                        {customer.type === CUSTOMER_TYPE.LOCAL
                          ? "Nội địa"
                          : "Nước ngoài"}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setCustomer(customer);
                            setShowConfirmModal(true);
                            setShowCustomerModal(false);
                          }}
                        >
                          Chọn
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
