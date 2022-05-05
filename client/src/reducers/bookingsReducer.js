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
    default:
      return state;
  }
};
