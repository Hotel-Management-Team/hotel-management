export const roomTypeReducer = (state, action) => {
  const {
    type,
    payload: { roomTypes, roomTypeLoading },
  } = action;

  switch (type) {
    case "GET_ROOM_TYPE_SUCCESS":
      return {
        ...state,
        roomTypes,
        roomTypeLoading,
      };
    case "GET_ROOM_TYPE_FAILURE":
      return {
        ...state,
        roomTypes,
        roomTypeLoading,
      };

    default:
      return state;
  }
};
