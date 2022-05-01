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
        case "GET_CUSTOMER_SUCCESS":
            return {
                ...state,
                customer: payload.customer,
                customerLoading: payload.customerLoading,
            };
        case "GET_CUSTOMER_FAILURE":
            return {
                ...state,
                customer: [],
                customerLoading: payload.customerLoading,
            };
        case "ADD_CUSTOMER_SUCCESS":
            return {
                ...state,
                customers: [...state.customers, payload.customer],
                customerLoading: payload.customerLoading,
            };
        default:
            return state;
    }
};