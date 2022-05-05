export const bookingsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_BOOKINGS_SUCCESS":
      return {
        ...state,
        bookings: payload.bookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_BOOKINGS_FAILURE":
      return {
        ...state,
        bookings: payload.bookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_BOOK_BY_BLOCK_SUCCESS":
      return {
        ...state,
        bookingsByBlock: payload.bookingsByBlock,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_BOOK_BY_BLOCK_FAILURE":
      return {
        ...state,
        bookingsByBlock: payload.bookingsByBlock,
        bookingsLoading: payload.bookingsLoading,
      };

    case "FILTER_BY_DATE":
      return {
        ...state,
        bookingsByDate: payload.bookingsByDate,
      };
    case "FILTER_BY_DATE_FAILURE":
      return {
        ...state,
        bookingsByDate: payload.bookingsByDate,
      };
    case "ADD_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: [...state.bookings, payload],
        bookingsByDate: state.bookingsByDate.filter(
          (booking) => booking._id !== payload.room
        ),
        bookingsByBlock: state.bookingsByBlock.filter(
          (booking) => booking._id !== payload.room
        ),
      };
    case "GET_WAITING_BOOKINGS_SUCCESS":
      return {
        ...state,
        waitingBookings: payload.waitingBookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_WAITING_BOOKINGS_FAILURE":
      return {
        ...state,
        waitingBookings: payload.waitingBookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_USING_BOOKINGS_SUCCESS":
      return {
        ...state,
        usingBookings: payload.usingBookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_USING_BOOKINGS_FAILURE":
      return {
        ...state,
        usingBookings: payload.usingBookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_AVAILABLE_BOOKINGS_SUCCESS":
      return {
        ...state,
        availableBookings: payload.availableBookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "GET_NEED_CLEAN_BOOKINGS_SUCCESS":
      return {
        ...state,
        needCleanBookings: payload.needCleanBookings,
        bookingsLoading: payload.bookingsLoading,
      };
    case "CHECK_IN_ROOM_SUCCESS":
      return {
        ...state,
        usingBookings: [...state.usingBookings, payload],
        availableBookings: state.availableBookings.filter(
          (booking) => booking._id !== payload.room
        ),
      };
    case "CHECK_IN_ROOM_FAILURE":
      return {
        ...state,
      };



    default:
      return state;
  }
};
