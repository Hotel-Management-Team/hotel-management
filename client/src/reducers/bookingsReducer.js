export const bookingsReducer = (state, action) => {
  const {
    type,
    payload: { bookings, bookingsLoading, bookingsByBlock, bookingsByDate },
  } = action;

  switch (type) {
    case "GET_BOOKINGS_SUCCESS":
      return {
        ...state,
        bookings,
        bookingsLoading,
      };
    case "GET_BOOKINGS_FAILURE":
      return {
        ...state,
        bookings,
        bookingsLoading,
      };
    case "GET_BOOK_BY_BLOCK_SUCCESS":
      return {
        ...state,
        bookingsByBlock,
        bookingsLoading,
      };
    case "GET_BOOK_BY_BLOCK_FAILURE":
      return {
        ...state,
        bookingsByBlock,
        bookingsLoading,
      };

    case "FILTER_BY_DATE":
      return {
        ...state,
        bookings: bookings,
        bookingsLoading: bookingsLoading,
      };
    case "FILTER_BY_DATE_FAILURE":
      return {
        ...state,
        bookings: bookings,
        bookingsLoading: bookingsLoading,
      };
    case "ADD_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: bookings,
        bookingsLoading: bookingsLoading,
      };
    default:
      return state;
  }
};
