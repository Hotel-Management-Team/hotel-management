import React, { createContext, useReducer, useState, useEffect } from "react";
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

  const [showAddSubAccountModal, setShowAddSubAccountModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [showEditSubAccountModal, setShowEditSubAccountModal] = useState(false);

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
      const res = await axios.post(`${apiUrl}/user`, subAccount);
      if (res.data.success) {
        subAccountDispatch({
          type: "ADD_SUB_ACCOUNT",
          payload: res.data.data,
        });
      }
      return res.data;
    } catch (error) {
      console.log(error);
      return error ? error.response.data : error;
    }
  };

  // Find subAccount
  const findSubAccount = async (id) => {
    const selectedSubAccount = subAccountState.subAccounts.find(
      (subAccount) => subAccount._id === id
    );
    subAccountDispatch({
      type: "FIND_SUB_ACCOUNT",
      payload: selectedSubAccount,
    });
  };

  const banSubAccount = async (id) => {
    try {
      const res = await axios.put(`${apiUrl}/permissions/banned/${id}`);
      if (res.data.success) {
        subAccountDispatch({
          type: "UPDATE_SUB_ACCOUNT",
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // edit permission of subAccount
  const editPermissions = async (id, permissions) => {
    try {
      const res = await axios.put(`${apiUrl}/permissions/${id}`, permissions);
      if (res.data.success) {
        subAccountDispatch({
          type: "UPDATE_SUB_ACCOUNT",
          payload: res.data.data,
        });
      }
      return res.data;
    } catch (error) {
      console.log(error);
      return error ? error.response.data : error;
    }
  };

  const SubAccountContextValue = {
    subAccountState,
    subAccountDispatch,
    getSubAccounts,
    addSubAccount,
    findSubAccount,
    banSubAccount,
    showAddSubAccountModal,
    setShowAddSubAccountModal,
    showToast,
    setShowToast,
    showEditSubAccountModal,
    setShowEditSubAccountModal,
    editPermissions,
  };

  return (
    <SubAccountContext.Provider value={SubAccountContextValue}>
      {children}
    </SubAccountContext.Provider>
  );
};
export default SubAccountContextProvider;
