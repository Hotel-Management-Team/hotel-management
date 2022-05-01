import React, { createContext, useReducer, useState } from "react";
import { bookingsReducer } from "../reducers/bookingsReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const BookingsContext = createContext();

const BookingsContextProvider = ({ children }) => {
    const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, {
        bookings: [],
        bookingsLoading: true,
    });

    // handle click
    const [showAddBookingModal, setShowAddBookingModal] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        msg: "",
        type: null,
    });

    const filterByDate = (date, selectedOption, rooms) => {
        let result2 = [];
        const dateArrival_ = new Date(date.arrival);
        const dateDeparture_ = new Date(date.departure);

        if (!date.arrival || !date.departure || dateArrival_.getTime() > dateDeparture_.getTime() || date.arrival === date.departure) {
            bookingsDispatch({
                type: "FILTER_BY_DATE_FAILURE",
                payload: {
                    bookings: rooms,
                    bookingsLoading: false,
                }
            });
        } else {
            const result = rooms.filter((room) => {
                for (const ticket of room.tickets) {
                    let ticketArrival = new Date(ticket.arrivalDate);
                    let ticketDeparture = new Date(ticket.departureDate);
                    if ((dateArrival_.getTime() >= ticketDeparture.getTime()) ||
                        (dateDeparture_.getTime() <= ticketArrival.getTime())) {
                        continue;
                    }
                    return false;
                }
                return true;
            });

            if (selectedOption === null) {
                result2 = result;
            } else if (selectedOption.length === 0) {
                result2 = result;
            } else {
                result2 = result.filter((room) => {
                    for (const option of selectedOption) {
                        if (room.status === option.value) {
                            return true;
                        }
                    }
                    return false;
                });
            };
        };
        bookingsDispatch({
            type: "FILTER_BY_DATE",
            payload: {
                bookings: result2,
                bookingsLoading: false,
            },
        })
    };

    // Get all bookings
    const getBookings = async () => {
        try {
            const res = await axios.get(`${apiUrl}/booking`);
            if (res.data.success) {
                bookingsDispatch({
                    type: "GET_BOOKINGS_SUCCESS",
                    payload: {
                        bookings: res.data.data,
                        bookingsLoading: false,
                    },
                });
            }
        } catch (error) {
            console.log(error);
            bookingsDispatch({
                type: "GET_BOOKINGS_FAILURE",
                payload: {
                    bookings: [],
                    bookingsLoading: false,
                },
            });
        }
    };

    const addBooking = async (id_room, id_customer, date) => {
        const data = {
            id_room,
            id_customer,
            date,
        };

        const res = await axios.post(`${apiUrl}/bookings`, data);
        if (res.data.success) {
            bookingsDispatch({
                type: "ADD_BOOKING_SUCCESS",
                payload: {
                    bookings: res.data.data,
                    bookingsLoading: false,
                },
            });
        }
    };

    const BookingsContextValue = {
        bookingsState,
        bookingsDispatch,
        getBookings,
        filterByDate,
        showAddBookingModal,
        setShowAddBookingModal,
        showCustomerModal,
        setShowCustomerModal,
        showAddCustomerModal,
        setShowAddCustomerModal,
        showToast,
        setShowToast,
    };

    return (
        <BookingsContext.Provider value={BookingsContextValue}>
            {children}
        </BookingsContext.Provider>
    );
};

export default BookingsContextProvider;