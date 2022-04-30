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

    const CustomersContextValue = {
        customerState,
        customerDispatch,
        getCustomers,
    };

    return (
        <CustomersContext.Provider value={CustomersContextValue}>
            {children}
        </CustomersContext.Provider>
    );
};

export default CustomerContextProvider;