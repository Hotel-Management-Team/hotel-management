import { createContext, useReducer, useState } from "react";
import { roomTypeReducer } from "../reducers/roomTypeReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const RoomTypeContext = createContext();

const RoomTypeContextProvider = ({ children }) => {
  const [roomTypeState, roomTypeDispatch] = useReducer(roomTypeReducer, {
    roomType: null,
    roomTypes: [],
    roomTypeLoading: true,
  });

  // show modal
  const [showAddRoomTypeModal, setShowAddRoomTypeModal] = useState(false);
  const [showUpdateRoomTypeModal, setShowUpdateRoomTypeModal] = useState(false);

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
    showAddRoomTypeModal,
    setShowAddRoomTypeModal,
  };

  return (
    <RoomTypeContext.Provider value={RoomTypeContextValue}>
      {children}
    </RoomTypeContext.Provider>
  );
};

export default RoomTypeContextProvider;
