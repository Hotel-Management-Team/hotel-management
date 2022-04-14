export const roomsReducer = (state, action) => {
  const {
    type,
    payload: { rooms, roomsLoading },
  } = action;

  switch (type) {
    case "GET_ROOMS_SUCCESS":
      return {
        ...state,
        rooms,
        roomsLoading,
      };
    case "GET_ROOMS_FAILURE":
      return {
        ...state,
        rooms,
        roomsLoading,
      };

    default:
      return state;
  }
};
