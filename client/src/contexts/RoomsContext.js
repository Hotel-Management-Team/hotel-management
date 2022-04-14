import { createContext, useReducer, useEffect } from "react";
import { roomsReducer } from "../reducers/roomsReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const RoomsContext = createContext();

const RoomsContextProvider = ({ children }) => {
  const [roomsState, roomsDispatch] = useReducer(roomsReducer, {
    rooms: [],
    roomsLoading: true,
  });

  // Get all rooms
  const getRooms = async () => {
    try {
      const res = await axios.get(`${apiUrl}/rooms`);
      if (res.data.success) {
        roomsDispatch({
          type: "GET_ROOMS_SUCCESS",
          payload: {
            rooms: res.data.rooms,
            roomsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      roomsDispatch({
        type: "GET_ROOMS_FAILURE",
        payload: {
          rooms: [],
          roomsLoading: false,
        },
      });
    }
  };

  const RoomsContextValue = {
    roomsState,
    roomsDispatch,
    getRooms,
  };

  return (
    <RoomsContext.Provider value={RoomsContextValue}>
      {children}
    </RoomsContext.Provider>
  );
};

export default RoomsContextProvider;
