export const customerReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_CUSTOMERS_SUCCESS":
            return {
                ...state,
                customers: payload.customers,
                customerLoading: payload.customerLoading,
            };
        case "GET_CUSTOMERS_FAILURE":
            return {
                ...state,
                customers: [],
                customerLoading: payload.customerLoading,
            };
        default:
            return state;
    }
};