export const bookingsReducer = (state, action) => {
    const {
        type,
        payload: { bookings, bookingsLoading },
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

        default:
            return state;
    }
};
