import { createContext, useReducer, useEffect, useContext, useState } from "react";
import { chargeReducer } from "../reducers/chargeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ChargesContext = createContext();

const ChargeContextProvider = ({ children }) => {
  const [chargeState, chargeDispatch] = useReducer(chargeReducer, {
    charges: [],
    charge: null,
    chargeLoading: true,
  });

  // handal click
  const [showAddChargeModal, setShowAddChargeModal] = useState(false);
  const [showUpdateChargeModal, setShowUpdateChargeModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: null,
  });
  // Get all charge
  const getCharges = async () => {
    try {
      const res = await axios.get(`${apiUrl}/charge`);
      if (res.data.success) {
        chargeDispatch({
          type: "GET_CHARGE_SUCCESS",
          payload: {
            charges: res.data.data,
            chargeLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      chargeDispatch({
        type: "GET_CHARGE_FAILURE",
        payload: {
          charges: [],
          chargeLoading: false,
        },
      });
    }
  };

  // Add new charge
  const addCharge = async (charge) => {
    try {
      const res = await axios.post(`${apiUrl}/charge`, charge);
      if (res.data.success) {
        chargeDispatch({
          type: "ADD_CHARGE",
          payload: res.data.data,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  // delete charge
  const deleteCharge = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/charge/${id}`);
      if (res.data.success) {
        chargeDispatch({
          type: "DELETE_CHARGE",
          payload: id,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  // update charge
  const updateCharge = async (id, charge) => {
    try {
      const res = await axios.put(`${apiUrl}/charge/${id}`, charge);
      if (res.data.success) {
        chargeDispatch({
          type: "UPDATE_CHARGE",
          payload: res.data.data,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  // find charge
  const findCharge = async (id) => {
    const selectedCharge = chargeState.charges.find((charge) => charge._id === id);
    chargeDispatch({
      type: "FIND_CHARGE",
      payload: selectedCharge,
    });
  };

  const ChargesContextValue = {
    chargeState,
    chargeDispatch,
    getCharges,
    addCharge,
    showAddChargeModal,
    setShowAddChargeModal,
    showToast,
    setShowToast,
    deleteCharge,
    updateCharge,
    findCharge,
    setShowUpdateChargeModal,
    showUpdateChargeModal,
  };

  return (
    <ChargesContext.Provider value={ChargesContextValue}>
      {children}
    </ChargesContext.Provider>
  );
};

export default ChargeContextProvider;
