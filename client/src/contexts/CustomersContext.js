import { createContext, useReducer, useState } from "react";
import { customerReducer } from "../reducers/customerReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const CustomersContext = createContext();

const CustomerContextProvider = ({ children }) => {

    const [customerState, customerDispatch] = useReducer(customerReducer, {
        customers: [],
        customerLoading: true,
    });
    const [showToast, setShowToast] = useState({
        show: false,
        msg: "",
        type: null,
    });

    const getCustomers = async () => {
        try {
            const res = await axios.get(`${apiUrl}/customer`);
            if (res.data.success) {
                customerDispatch({
                    type: "GET_CUSTOMERS_SUCCESS",
                    payload: {
                        customers: res.data.data,
                        customerLoading: false,
                    },
                });
            }
            return res.data;
        } catch (error) {
            console.log(error);
            customerDispatch({
                type: "GET_CUSTOMERS_FAILURE",
                payload: {
                    customers: [],
                    customerLoading: false,
                },
            });
            return error;
        }
    };

    const findCustomer = async (id) => {
        try {
            const selectedCustomer = customerState.customers.find(customer => customer._id === id);
            customerDispatch({
                type: "GET_CUSTOMER_SUCCESS",
                payload: selectedCustomer,
            });
            return selectedCustomer;
        } catch (error) {
            console.log(error);
            customerDispatch({
                type: "GET_CUSTOMER_FAILURE",
                payload: {
                    customer: null,
                },
            });
            return error;
        }
    };

    const addCustomer = async (newCustomer) => {
        try {
            const res = await axios.post(`${apiUrl}/customer`, newCustomer);
            if (res.data.success) {
                customerDispatch({
                    type: "ADD_CUSTOMER_SUCCESS",
                    payload: res.data.data,
                });
                return res.data;
            } else {
                return res.data;
            }
        } catch (error) {
            console.log(error);
            customerDispatch({
                type: "ADD_CUSTOMER_FAILURE",
                payload: {
                    customer: null,
                },
            });
            return error;
        }
    };

    const CustomersContextValue = {
        customerState,
        customerDispatch,
        getCustomers,
        findCustomer,
        addCustomer,
        showToast,
        setShowToast,
    };

    return (
        <CustomersContext.Provider value={CustomersContextValue}>
            {children}
        </CustomersContext.Provider>
    );
};

export default CustomerContextProvider;