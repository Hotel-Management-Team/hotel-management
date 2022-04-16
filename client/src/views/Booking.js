import React from "react";
import { useContext, useState, useEffect } from "react";
import { BookingsContext } from "../contexts/BookingsContext";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const columns = [
  {
    dataField: "id",
    text: "#",
    headerStyle: (colum, colIndex) => {
      return { backgroundColor: '#defffd', width: '20%', textAlign: 'center' };
    }
  },
  {
    dataField: "name",
    text: "Product Name",
  },
  {
    dataField: "value",
    text: "Product value",
  },
];

const Bookings = () => {
  const {
    bookingsState: { bookingsLoading, bookings },
    getBookings,
  } = useContext(BookingsContext);

  useEffect(() => {
    if (bookings.length === 0) {
      getBookings();
    }
  }, []);

  const navigate = useNavigate();

  if (bookingsLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid my-1 d-flex justify-content-between">
        <div>
          <button
            className="btn btn-info"
            onClick={() => {
              navigate("/system-management");
            }}
          >
            Trở lại
          </button>
        </div>
        <button className="btn btn-info">Thêm Đặt phòng</button>
      </div>
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable
          striped
          hover
          keyField="id"
          data={bookings}
          columns={columns}
        />
      </div>
    </>
  );
};
export default Bookings;
