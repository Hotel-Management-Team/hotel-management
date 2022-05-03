import React from "react";
import { Button, Table } from "react-bootstrap";
import { useContext, useState, useEffect, useRef } from "react";
import { BookingsContext } from "../../../contexts/BookingsContext";

const BookByBlock = () => {
  const {
    bookingsState: { bookingsByBlock },
    getBookByBlock,
    bookingsLoading,
  } = useContext(BookingsContext);

  useEffect(() => {
    getBookByBlock();
  }, []);

  return (
    <>
      <Button
        className="m-3"
        variant="outline-success"
        onClick={() => window.history.back()}
      >
        Trở về
      </Button>

      <div className="mt-5 mx-5 text-center">
        <Table responsive bordered hover className="mt-3">
          <thead className="text-primary bg-light border border-info">
            <tr>
              <th>#</th>
              <th>Tên phòng</th>
              <th>Loại phòng</th>
              <th>Loại giá</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {bookingsByBlock.length > 0 ? (
              bookingsByBlock.map((room, index) => (
                <tr key={room._id}>
                  <td>{index + 1}</td>
                  <td>{room.name}</td>
                  <td></td>
                  <td></td>
                  <td>{room.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <h3 className="text-center">Không có dữ liệu</h3>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BookByBlock;
