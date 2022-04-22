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
  const [showDeleteRoomTypeModal, setShowDeleteRoomTypeModal] = useState(false);
  const [showUpdateRoomTypeModal, setShowUpdateRoomTypeModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: null,
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

  // add room type
  const addRoomType = async (roomType) => {
    try {
      const res = await axios.post(`${apiUrl}/roomType`, roomType);
      if (res.data.success) {
        roomTypeDispatch({
          type: "ADD_ROOM_TYPE",
          payload: res.data.data,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  // find room type
  const findRoomType = async (id) => {
    const selectedRoomType = roomTypeState.roomTypes.find(
      (roomtype) => roomtype._id === id
    );
    roomTypeDispatch({
      type: "FIND_ROOM_TYPE",
      payload: selectedRoomType,
    });
  };

  // delete room type
  const deleteRoomType = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/roomType/${id}`);
      if (res.data.success) {
        roomTypeDispatch({
          type: "DELETE_ROOM_TYPE",
          payload: id,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  // update room type
  const updateRoomType = async (roomType) => {
    try {
      const res = await axios.put(
        `${apiUrl}/roomType/${roomType._id}`,
        roomType
      );
      if (res.data.success) {
        roomTypeDispatch({
          type: "UPDATE_ROOM_TYPE",
          payload: res.data.data,
        });
      }
      return res.data;
    } catch (error) {
      return error ? error : { success: false, msg: "Server error" };
    }
  };

  const RoomTypeContextValue = {
    roomTypeState,
    roomTypeDispatch,
    getRoomTypes,
    showAddRoomTypeModal,
    setShowAddRoomTypeModal,
    showDeleteRoomTypeModal,
    setShowDeleteRoomTypeModal,
    showUpdateRoomTypeModal,
    setShowUpdateRoomTypeModal,
    addRoomType,
    showToast,
    setShowToast,
    findRoomType,
    deleteRoomType,
    updateRoomType,
  };

  return (
    <RoomTypeContext.Provider value={RoomTypeContextValue}>
      {children}
    </RoomTypeContext.Provider>
  );
};

export default RoomTypeContextProvider;
