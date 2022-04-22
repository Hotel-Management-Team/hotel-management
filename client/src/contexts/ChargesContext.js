import { createContext, useReducer, useEffect, useContext, useState } from "react";
import { chargeReducer } from "../reducers/chargeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ChargesContext = createContext();

const ChargeContextProvider = ({ children }) => {
  const [chargeState, chargeDispatch] = useReducer(chargeReducer, {
    charges: [],
    chargeLoading: true,
  });

  // handal click

  const [showAddChargeModal, setShowAddChargeModal] = useState(false);
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

  const RoomTypeContextValue = {
    chargeState,
    chargeDispatch,
    getCharges,
    addCharge,
    showAddChargeModal,
    setShowAddChargeModal,
    showToast,
    setShowToast,
  };

  return (
    <ChargesContext.Provider value={RoomTypeContextValue}>
      {children}
    </ChargesContext.Provider>
  );
};

export default ChargeContextProvider;
