import { createContext, useReducer, useEffect } from "react";
import { roomTypeReducer } from "../reducers/roomTypeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const RoomTypeContext = createContext();

const RoomTypeContextProvider = ({ children }) => {
  const [roomTypeState, roomTypeDispatch] = useReducer(roomTypeReducer, {
    roomType: [],
    roomTypeLoading: true,
  });

  // Get all rooms
  const getRoomType = async () => {
    try {
      const res = await axios.get(`${apiUrl}/roomType`);
      if (res.data.success) {
        roomTypeDispatch({
          type: "GET_ROOM_TYPE_SUCCESS",
          payload: {
            roomType: res.data.data,
            roomTypeLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      roomTypeDispatch({
        type: "GET_ROOM_TYPE_FAILURE",
        payload: {
          roomType: [],
          roomTypeLoading: false,
        },
      });
    }
  };

  const RoomTypeContextValue = {
    roomTypeState,
    roomTypeDispatch,
    getRoomType,
  };

  return (
    <RoomTypeContext.Provider value={RoomTypeContextValue}>
      {children}
    </RoomTypeContext.Provider>
  );
};

export default RoomTypeContextProvider;
