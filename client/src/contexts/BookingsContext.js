import React, { createContext, useReducer, useEffect } from "react";
import { bookingsReducer } from "../reducers/bookingsReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const BookingsContext = createContext();

const BookingsContextProvider = ({ children }) => {
    const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, {
        bookings: [],
        bookingsLoading: true,
    });

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

    const BookingsContextValue = {
        bookingsState,
        bookingsDispatch,
        getBookings,
    };

    return (
        <BookingsContext.Provider value={BookingsContextValue}>
            {children}
        </BookingsContext.Provider>
    );
};

export default BookingsContextProvider;