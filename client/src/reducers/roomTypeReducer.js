export const roomTypeReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_ROOM_TYPE_SUCCESS":
      return {
        ...state,
        roomTypes: payload.roomTypes,
        roomTypeLoading: payload.roomTypeLoading,
      };
    case "GET_ROOM_TYPE_FAILURE":
      return {
        ...state,
        roomTypes: [],
        roomTypeLoading: payload.roomTypeLoading,
      };
    case "ADD_ROOM_TYPE":
      return {
        ...state,
        roomTypes: [...state.roomTypes, payload],
      };

    case "FIND_ROOM_TYPE":
      return {
        ...state,
        roomType: payload,
        roomTypeLoading: false,
      };

    case "DELETE_ROOM_TYPE":
      return {
        ...state,
        roomTypes: state.roomTypes.filter(
          (roomType) => roomType._id !== payload
        ),
        roomTypeLoading: false,
      };

    case "UPDATE_ROOM_TYPE":
      const newRoomTypes = state.roomTypes.map((roomType) => {
        if (roomType._id === payload._id) {
          payload.numberOfRoom = roomType.numberOfRoom;
          return payload;
        } else {
          return roomType;
        }
      });
      return {
        ...state,
        roomTypes: newRoomTypes,
        roomTypeLoading: false,
      };

    default:
      return state;
  }
};
