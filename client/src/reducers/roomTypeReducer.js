export const roomTypeReducer = (state, action) => {
  const {
    type,
    payload: { roomType, roomTypeLoading },
  } = action;

  switch (type) {
    case "GET_ROOM_TYPE_SUCCESS":
      return {
        ...state,
        roomType,
        roomTypeLoading,
      };
    case "GET_ROOM_TYPE_FAILURE":
      return {
        ...state,
        roomType,
        roomTypeLoading,
      };

    default:
      return state;
  }
};
