import React from "react";
import BackStackButton from "../../../components/common/BackStackButton";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../../../contexts/RoomsContext";
import { BookingsContext } from "../../../contexts/BookingsContext";
import { Table } from "react-bootstrap";

const Percentage = () => {
  const {
    roomsState: { rooms },
    getRooms,
  } = useContext(RoomsContext);

  const {
    bookingsState: { allBookings },
    getAllBookings,
  } = useContext(BookingsContext);

  useEffect(() => {
    getRooms();
    getAllBookings();
  }, []);

  const [percentage, setPercentage] = useState([]);

  // console.log(percentage);

  const [selectedMonth, setSelectedMonth] = useState({});
  return (
    <>
      <BackStackButton />
      <div className="mt-3 mx-5 text-center">
        <h2>
          <strong>BÁO CÁO MẬT ĐỘ SỬ DỤNG PHÒNG</strong>
        </h2>
        <div className="mt-3 d-flex justify-content-between ">
          <input
            type="month"
            style={{ width: "300px" }}
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              const bookingChange = allBookings.filter((booking) => {
                return (
                  new Date(booking.arrivalDate).getMonth() ===
                    new Date(e.target.value).getMonth() &&
                  new Date(booking.arrivalDate).getFullYear() ===
                    new Date(e.target.value).getFullYear()
                );
              });

              console.log(bookingChange);

              setPercentage(
                rooms.map((room) => {
                  let count = 0;
                  bookingChange.map((booking) => {
                    if (booking.room === room._id) {
                      count++;
                    }
                  });
                  return {
                    room: room.name,
                    percentage: (count / bookingChange.length) * 100,
                  };
                })
              );
            }}
          />
          <h4>
            {selectedMonth !== "" ? (
              <strong>
                Tháng: {new Date(selectedMonth).getMonth() + 1} ,Năm:{" "}
                {new Date(selectedMonth).getFullYear()}
              </strong>
            ) : (
              <strong>Tháng:_______, Năm:_______</strong>
            )}
          </h4>
        </div>
        <Table responsive bordered hover className="mt-3">
          <thead className="text-primary bg-light border border-info">
            <tr>
              <th>STT</th>
              <th>Loại phòng</th>
              <th>Doanh thu</th>
              <th>Tỷ lệ</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {rooms.map((room, index) => {
              return (
                <tr key={room._id}>
                  <td>{index + 1}</td>
                  <td>{room.name}</td>
                  <td></td>
                  <td> </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </Table>
      </div>
    </>
  );
};

export default Percentage;
