import { createContext, useReducer, useEffect } from "react";
import { chargeReducer } from "../reducers/chargeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ChargeContext = createContext();

const ChargeContextProvider = ({ children }) => {
  const [chargeState, chargeDispatch] = useReducer(chargeReducer, {
    charges: [],
    chargeLoading: true,
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

  const RoomTypeContextValue = {
    chargeState,
    chargeDispatch,
    getCharges,
  };

  return (
    <ChargeContext.Provider value={RoomTypeContextValue}>
      {children}
    </ChargeContext.Provider>
  );
};

export default ChargeContextProvider;
