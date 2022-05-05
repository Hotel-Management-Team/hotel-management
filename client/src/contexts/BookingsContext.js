import React, { createContext, useReducer, useState } from "react";
import { bookingsReducer } from "../reducers/bookingsReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const BookingsContext = createContext();

const BookingsContextProvider = ({ children }) => {
  const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, {
    bookings: [],
    bookingsLoading: true,
    bookingsByBlock: [],
    bookingsByDate: [],
  });

  // handle click
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: null,
  });
  const [dateArrival, setDateArrival] = useState("");
  const [dateDeparture, setDateDeparture] = useState("");
  const [room, setRoom] = useState({});
  const [customer, setCustomer] = useState({});
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(0);
  const filterByDate = (date, rooms) => {
    const dateArrival_ = new Date(date.arrival);
    const dateDeparture_ = new Date(date.departure);
    let result;
    if (
      !date.arrival ||
      !date.departure ||
      dateArrival_.getTime() > dateDeparture_.getTime() ||
      date.arrival === date.departure
    ) {
      bookingsDispatch({
        type: "FILTER_BY_DATE_FAILURE",
        payload: {
          bookingsByDate: [],
        },
      });
    } else {
      result = rooms.filter((room) => {
        for (const ticket of room.tickets) {
          let ticketArrival = new Date(ticket.arrivalDate);
          let ticketDeparture = new Date(ticket.departureDate);
          if (
            dateArrival_.getTime() >= ticketDeparture.getTime() ||
            dateDeparture_.getTime() <= ticketArrival.getTime()
          ) {
            continue;
          }
          return false;
        }
        return true;
      });
    }
    bookingsDispatch({
      type: "FILTER_BY_DATE",
      payload: {
        bookingsByDate: result,
      },
    });
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

  const addBooking = async (customerId, roomId, arrivalDate, departureDate) => {
    const data = {
      customerId,
      roomId,
      arrivalDate,
      departureDate,
    };

    const res = await axios.post(`${apiUrl}/ticket`, data);
    if (res.data.success) {
      bookingsDispatch({
        type: "ADD_BOOKING_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    }
  };

  const getBookByBlock = async () => {
    try {
      const res = await axios.get(`${apiUrl}/booking/byblock`);
      if (res.data.success) {
        bookingsDispatch({
          type: "GET_BOOK_BY_BLOCK_SUCCESS",
          payload: {
            bookingsByBlock: res.data.data,
            bookingsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      bookingsDispatch({
        type: "GET_BOOK_BY_BLOCK_FAILURE",
        payload: {
          bookingsByBlock: [],
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
    showInvoiceModal,
    setShowInvoiceModal,
    showToast,
    setShowToast,
    addBooking,
    dateArrival,
    setDateArrival,
    dateDeparture,
    setDateDeparture,
    room,
    setRoom,
    customer,
    setCustomer,
    getBookByBlock,
    total,
    setTotal,
    date,
    setDate,
  };

  return (
    <BookingsContext.Provider value={BookingsContextValue}>
      {children}
    </BookingsContext.Provider>
  );
};

export default BookingsContextProvider;
