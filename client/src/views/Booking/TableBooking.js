import React from "react";

export const TableBooking = (prop) => {
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên phòng</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Arrival</th>
                        <th scope="col">Departure</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {prop.bookings && prop.bookings.map((room, index) => {
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
                                    <td>
                                        <button disabled={room.status === "Using" || room.status === "NeedClean"}
                                            className="btn btn-primary"
                                            onClick={() => { prop.handleBooking(room) }}
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
                                            <button disabled={room.status === "Using" || room.status === "NeedClean"}
                                                className="btn btn-primary"
                                                onClick={() => { prop.handleBooking(room) }}
                                            >
                                                Book
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                        }
                    }
                    )}
                </tbody>
            </table>
        </>
    );
};