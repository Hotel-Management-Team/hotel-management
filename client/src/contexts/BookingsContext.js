import React, { createContext, useReducer, useState } from "react";
import { bookingsReducer } from "../reducers/bookingsReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const BookingsContext = createContext();

const BookingsContextProvider = ({ children }) => {
  const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, {
    bookings: [],
    booking: null,
    bookingsLoading: true,
    bookingsByBlock: [],
    bookingsByDate: [],
    waitingBookings: [],
    usingBookings: [],
    availableBookings: [],
    needCleanBookings: [],
    allBookings: [],
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
          if (ticket.isSolved) {
            return true;
          }
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

  const getWaitingBookings = async () => {
    try {
      const res = await axios.get(`${apiUrl}/booking/waiting`);
      if (res.data.success) {
        bookingsDispatch({
          type: "GET_WAITING_BOOKINGS_SUCCESS",
          payload: {
            waitingBookings: res.data.data,
            bookingsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      bookingsDispatch({
        type: "GET_WAITING_BOOKINGS_FAILURE",
        payload: {
          waitingBookings: [],
          bookingsLoading: false,
        },
      });
    }
  };

  const getUsingBookings = async () => {
    try {
      const res = await axios.get(`${apiUrl}/booking/using`);
      if (res.data.success) {
        bookingsDispatch({
          type: "GET_USING_BOOKINGS_SUCCESS",
          payload: {
            usingBookings: res.data.data,
            bookingsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      bookingsDispatch({
        type: "GET_USING_BOOKINGS_FAILURE",
        payload: {
          usingBookings: [],
          bookingsLoading: false,
        },
      });
    }
  };

  const getAvailableBookings = async () => {
    try {
      const res = await axios.get(`${apiUrl}/booking/available`);
      if (res.data.success) {
        bookingsDispatch({
          type: "GET_AVAILABLE_BOOKINGS_SUCCESS",
          payload: {
            availableBookings: res.data.data,
            bookingsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      bookingsDispatch({
        type: "GET_AVAILABLE_BOOKINGS_FAILURE",
        payload: {
          availableBookings: [],
          bookingsLoading: false,
        },
      });
    }
  };

  const getNeedCleanBookings = async () => {
    try {
      const res = await axios.get(`${apiUrl}/booking/needclean`);
      if (res.data.success) {
        bookingsDispatch({
          type: "GET_NEED_CLEAN_BOOKINGS_SUCCESS",
          payload: {
            needCleanBookings: res.data.data,
            bookingsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      bookingsDispatch({
        type: "GET_NEED_CLEAN_BOOKINGS_FAILURE",
        payload: {
          needCleanBookings: [],
          bookingsLoading: false,
        },
      });
    }
  };

  const checkinBooking = async (ticketId) => {
    const res = await axios.put(`${apiUrl}/booking/checkin/${ticketId}`);
    if (res.data.success) {
      bookingsDispatch({
        type: "CHECKIN_BOOKING_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    }
  };

  const checkoutBooking = async (invoice) => {
    const res = await axios.put(
      `${apiUrl}/booking/checkout/${invoice._id}/${invoice.total}`
    );
    if (res.data.success) {
      bookingsDispatch({
        type: "CHECKOUT_BOOKING_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    }
  };

  const cleanRoom = async (ticketId) => {
    const res = await axios.put(`${apiUrl}/booking/clean/${ticketId}`);
    if (res.data.success) {
      bookingsDispatch({
        type: "CLEAN_ROOM_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    }
  };

  const cancelBooking = async (ticketId) => {
    const res = await axios.delete(`${apiUrl}/booking/cancel/${ticketId}`);
    if (res.data.success) {
      bookingsDispatch({
        type: "CANCEL_BOOKING_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    }
  };

  const getAllBookings = async () => {
    try {
      const res = await axios.get(`${apiUrl}/booking/all`);
      if (res.data.success) {
        bookingsDispatch({
          type: "GET_ALL_BOOKINGS_SUCCESS",
          payload: {
            allBookings: res.data.data,
            bookingsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      bookingsDispatch({
        type: "GET_ALL_BOOKINGS_FAILURE",
        payload: {
          allBookings: [],
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
    getWaitingBookings,
    getUsingBookings,
    getAvailableBookings,
    getNeedCleanBookings,
    checkinBooking,
    checkoutBooking,
    cleanRoom,
    cancelBooking,
    getAllBookings,
  };

  return (
    <BookingsContext.Provider value={BookingsContextValue}>
      {children}
    </BookingsContext.Provider>
  );
};

export default BookingsContextProvider;
