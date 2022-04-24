import { createContext, useReducer, useState } from "react";
import { roomsReducer } from "../reducers/roomsReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const RoomsContext = createContext();

const RoomsContextProvider = ({ children }) => {
  const [roomsState, roomsDispatch] = useReducer(roomsReducer, {
    room: null,
    rooms: [],
    roomsLoading: true,
  });

  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: null,
  });

  // Get all rooms
  const getRooms = async () => {
    try {
      const res = await axios.get(`${apiUrl}/rooms`);
      if (res.data.success) {
        roomsDispatch({
          type: "GET_ROOMS_SUCCESS",
          payload: {
            rooms: res.data.data,
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

  const getRoomsTickets = async () => {
    try {
      const res = await axios.get(`${apiUrl}/room/findRoom`);
      if (res.data.success) {
        roomsDispatch({
          type: "GET_ROOMS_TICKETS_SUCCESS",
          payload: {
            rooms: res.data.data,
            roomsLoading: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      roomsDispatch({
        type: "GET_ROOMS_TICKETS_FAILURE",
        payload: {
          rooms: [],
          roomsLoading: false,
        },
      });
    }
  };
  // add room
  const addRoom = async (room) => {
    try {
      const res = await axios.post(`${apiUrl}/room`, room);
      if (res.data.success) {
        roomsDispatch({
          type: "ADD_ROOM",
          payload: res.data.data,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  // find room
  const findRoom = async (id) => {
    const selectedRoom = roomsState.rooms.find((room) => room._id === id);
    roomsDispatch({
      type: "FIND_ROOM",
      payload: selectedRoom,
    });
  };

  // delete room
  const deleteRoom = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/room/${id}`);
      if (res.data.success) {
        roomsDispatch({
          type: "DELETE_ROOM",
          payload: id,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  // update room
  const updateRoom = async (room) => {
    try {
      const res = await axios.put(`${apiUrl}/room/${room._id}`, room);
      if (res.data.success) {
        roomsDispatch({
          type: "UPDATE_ROOM",
          payload: res.data.data,
        });
        return res.data;
      }
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  const RoomsContextValue = {
    roomsState,
    roomsDispatch,
    getRooms,
    getRoomsTickets,
    showAddRoomModal,
    setShowAddRoomModal,
    showUpdateRoomModal,
    setShowUpdateRoomModal,
    showToast,
    setShowToast,
    addRoom,
    findRoom,
    deleteRoom,
    updateRoom,
  };

  return (
    <RoomsContext.Provider value={RoomsContextValue}>
      {children}
    </RoomsContext.Provider>
  );
};

export default RoomsContextProvider;
