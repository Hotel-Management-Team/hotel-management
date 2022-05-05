import React from "react";
import { Badge } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";

export const TableBooking = (prop) => {
  const {
    bookingsState: { bookingsByDate },
  } = useContext(BookingsContext);

  return (
    <>
      <div className="mt-5 mx-5 text-center">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên phòng</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Arrival</th>
              <th scope="col">Departure</th>
              <th scope="col">Giá cả</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bookingsByDate &&
              bookingsByDate.map((room, index) => {
                if (room.tickets.length === 0) {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{room.name}</td>
                      <td className="text-danger">
                        {room.status === "Available"
                          ? "Khả dụng"
                          : room.status === "NeedClean"
                          ? "Cần dọn"
                          : room.status === "Using"
                          ? "Đang sử dụng"
                          : "Đang chờ"}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <button
                          disabled={
                            room.status === "Using" ||
                            room.status === "NeedClean"
                          }
                          className="btn btn-primary"
                          onClick={() => {
                            prop.handleBooking(room);
                          }}
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
                        <td className="text-danger">
                          {room.status === "Available"
                            ? "Khả dụng"
                            : room.status === "NeedClean"
                            ? "Cần dọn"
                            : room.status === "Using"
                            ? "Đang sử dụng"
                            : "Đang chờ"}
                        </td>
                        <td>
                          {new Date(ticket.arrivalDate).toLocaleString(
                            "en-GB",
                            {
                              hour12: true,
                              hour: "numeric",
                              minute: "numeric",
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>
                          {new Date(ticket.departureDate).toLocaleString(
                            "en-GB",
                            {
                              hour12: true,
                              hour: "numeric",
                              minute: "numeric",
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>
                          {room.roomtype.name}{" "}
                          <Badge bg="secondary" className="mx-2 p-2">
                            {room.charge.DateCharge}/<small>ngày</small>
                          </Badge>{" "}
                        </td>
                        <td>
                          <button
                            disabled={
                              room.status === "Using" ||
                              room.status === "NeedClean"
                            }
                            className="btn btn-primary"
                            onClick={() => {
                              prop.handleBooking(room);
                            }}
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
    </>
  );
};
