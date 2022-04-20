import { createContext, useReducer, useEffect } from "react";
import { roomTypeReducer } from "../reducers/roomTypeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const RoomTypeContext = createContext();

const RoomTypeContextProvider = ({ children }) => {
  const [roomTypeState, roomTypeDispatch] = useReducer(roomTypeReducer, {
    roomTypes: [],
    roomTypeLoading: true,
  });

  // Get all rooms
  const getRoomTypes = async () => {
    try {
      const res = await axios.get(`${apiUrl}/roomType`);
      if (res.data.success) {
        roomTypeDispatch({
          type: "GET_ROOM_TYPE_SUCCESS",
          payload: {
            roomTypes: res.data.data,
            roomTypeLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      roomTypeDispatch({
        type: "GET_ROOM_TYPE_FAILURE",
        payload: {
          roomTypes: [],
          roomTypeLoading: false,
        },
      });
    }
  };

  const RoomTypeContextValue = {
    roomTypeState,
    roomTypeDispatch,
    getRoomTypes,
  };

  return (
    <RoomTypeContext.Provider value={RoomTypeContextValue}>
      {children}
    </RoomTypeContext.Provider>
  );
};

export default RoomTypeContextProvider;
