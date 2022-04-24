import React, { createContext, useReducer, useEffect } from "react";
import { SubAccountReducer } from "../reducers/SubAccountReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const SubAccountContext = createContext();

const SubAccountContextProvider = ({ children }) => {
  const [subAccountState, subAccountDispatch] = useReducer(SubAccountReducer, {
    subAccount: null,
    subAccounts: [],
    subAccountLoading: true,
  });

  // Get all subAccounts
  const getSubAccounts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user`);

      if (res.data.success) {
        subAccountDispatch({
          type: "GET_SUB_ACCOUNT_SUCCESS",
          payload: {
            subAccounts: res.data.data,
            subAccountLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      subAccountDispatch({
        type: "GET_SUB_ACCOUNT_FAILURE",
        payload: {
          subAccounts: [],
          subAccountLoading: false,
        },
      });
    }
  };

  // Add subAccount
  const addSubAccount = async (subAccount) => {
    try {
      const res = await axios.post(`${apiUrl}/sub-account`, subAccount);
      if (res.data.success) {
        subAccountDispatch({
          type: "ADD_SUB_ACCOUNT",
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find subAccount
  const findSubAccount = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/sub-account/${id}`);
      if (res.data.success) {
        subAccountDispatch({
          type: "FIND_SUB_ACCOUNT",
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SubAccountContextValue = {
    subAccountState,
    subAccountDispatch,
    getSubAccounts,
    addSubAccount,
    findSubAccount,
  };

  return (
    <SubAccountContext.Provider value={SubAccountContextValue}>
      {children}
    </SubAccountContext.Provider>
  );
};
export default SubAccountContextProvider;
