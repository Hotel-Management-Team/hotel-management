import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../contexts/RoomsContext";
import { BookingsContext } from "../contexts/BookingsContext";
import { Spinner, Form, Col, Row, Modal, Button } from "react-bootstrap";
import Select from "react-select";

const Dashboard = () => {

  const options = [
    { value: "Waiting", label: "Đang chờ" },
    { value: "Using", label: "Đang sử dụng" },
    { value: "Available", label: "Khả dụng" },
    { value: "NeedClean", label: "Cần dọn" },
  ];

  const {
    roomsState: { rooms, roomLoading },
    getRoomsTickets,
  } = useContext(RoomsContext);

  const {
    bookingsState: { bookings, bookingsLoading },
    filterByDate,
  } = useContext(BookingsContext);

  const [customer, setCustomer] = useState({ name: "", phone: "", email: "", address: "", ID: "", type: "" });

  // const onCustomerChange = (e) => {
  //   setCustomer({ ...customer, [e.target.name]: e.target.value });
  // }

  const [selectedOption, setSelectedOption] = useState(null);
  const [dateArrival, setDateArrival] = useState("");
  const [dateDeparture, setDateDeparture] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    getRoomsTickets();
  }, []);


  if (roomLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      {/* <Modal show={true}>
        <Modal.Header>
          <Modal.Title>
            <h1>Chọn khách hàng</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-md-8">
              <h4 className="text-center">Nhập thông tin khách hàng</h4>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">Tên</label>
                      <input
                        name="fullName"
                        onChange={onCustomerChange}
                        type="text"
                        className="form-control text-success"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={onCustomerChange}
                        className="form-control text-success"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">CMT/Passport</label>
                      <input
                        type="text"
                        name="id"
                        onChange={onCustomerChange}
                        className="form-control text-success"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select
                        options={[{ value: "local", label: "Nội địa" }, { value: "foreign", label: "Nước ngoài" }]}
                        selectedValue={selectedType}
                        name="type"
                        onChange={(selected) => {
                          setSelectedType(selected.value);
                          console.log(selectedType);
                        }}
                      />

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">Mật khẩu</label>
                      <input
                        placeholder="********"
                        type="password"
                        name="password"
                        // onChange={onInputChange}
                        className="form-control text-success"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">Nhập lại mật khẩu</label>
                      <input
                        placeholder="********"
                        type="password"
                        name="confirmPassword"
                        // onChange={onInputChange}
                        className="form-control text-success"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  {/* <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Huỷ
                      </Button> */}
      {/* <Button
        variant="success"
        type="button"
        size="md"
      //  onClick={validateForm}
      >
        Thay đổi
      </Button> */}
      {/* </div>
              </Form >
            </div > */}

      {/* 
      <Form.Group as={Row}>
        <Button variant="primary" onClick={() => {
        }
        }>
          Thêm mới
        </Button>
      </Form.Group>

    </Form >
        </Modal.Body >
  <Modal.Footer> */}
      {/* <button className="btn-primary" onClick={() => filterByDate({ arrival: dateArrival, departure: dateDeparture }, selectedOption, rooms)}>
        Tìm kiếm
      </button>
    </Modal.Footer>
      </Modal > * /} */}


      < div className="container d-flex flex-column p-4" >
        <div className="p-3">
          <h3 className="text-center">Loại phòng</h3>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={options}
            placeholder="Select status"
            selectedValue={selectedOption}
            // get option selected
            onChange={(selectedOption) => {
              setSelectedOption(selectedOption);
              filterByDate({ arrival: dateArrival, departure: dateDeparture }, selectedOption, rooms);
            }}
          />
        </div>
        <Form className="p-3">
          <Row>
            <Col>
              <Form.Group controlId="arrival">
                <Form.Label>Chọn ngày giờ đến</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="arrival"
                  value={dateArrival}
                  format="yyyy-MM-dd HH:mm"
                  onChange={(date) => {
                    setDateArrival(date.target.value);
                    filterByDate({ arrival: date.target.value, departure: dateDeparture }, selectedOption, rooms);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="departure">
                <Form.Label>Chọn ngày giờ rời</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="departure"
                  value={dateDeparture}
                  format="yyyy-MM-dd HH:mm"
                  onChange={(date) => {
                    setDateDeparture(date.target.value);
                    filterByDate({ arrival: dateArrival, departure: date.target.value }, selectedOption, rooms);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <div className="p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room Name</th>
                <th scope="col">Status</th>
                <th scope="col">Arrival</th>
                <th scope="col">Departure</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((room, index) => {
                if (room.tickets.length === 0) {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{room.name}</td>
                      <td className="text-danger">{
                        room.status === "Available" ? "Khả dụng" : room.status === "NeedClean" ? "Cần dọn" : room.status === "Using" ? "Đang sử dụng" : "Đang chờ"
                      }</td>
                      <td>Khả dụng</td>
                      <td>Khả dụng</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => console.log("Clicked")}
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  for (const ticket of room.tickets) {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{room.name}</td>
                        <td className="text-danger">{
                          room.status === "Available" ? "Khả dụng" : room.status === "NeedClean" ? "Cần dọn" : room.status === "Using" ? "Đang sử dụng" : "Đang chờ"
                        }</td>
                        <td>{
                          new Date(ticket.arrivalDate).toLocaleString("en-GB", {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric",
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })
                        }</td>
                        <td>{
                          new Date(ticket.departureDate).toLocaleString("en-GB", {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric",
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => console.log("Clicked")}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    );
                  }
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
