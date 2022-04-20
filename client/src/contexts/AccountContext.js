import React, { createContext, useReducer } from "react";
import { accountReducer } from "../reducers/accountReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
    const [accountState, accountDispatch] = useReducer(accountReducer, {
        account: [],
        accountLoading: true,
    });

    // Get all account
    const getAccount = async () => {
        try {
            const res = await axios.get(`${apiUrl}/user`);
            if (res.data.success) {
                accountDispatch({
                    type: "GET_ACCOUNT_SUCCESS",
                    payload: {
                        account: res.data.data,
                        accountLoading: false,
                    },
                });
            }
        } catch (error) {
            console.log(error);
            accountDispatch({
                type: "GET_ACCOUNT_FAILURE",
                payload: {
                    account: [],
                    accountLoading: false,
                },
            });
        }
    };

    const AccountContextValue = {
        accountState,
        accountDispatch,
        getAccount,
    };

    return (
        <AccountContext.Provider value={AccountContextValue}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;