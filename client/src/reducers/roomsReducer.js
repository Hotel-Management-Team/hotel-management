export const roomsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_ROOMS_SUCCESS":
      return {
        ...state,
        rooms: payload.rooms,
        roomsLoading: payload.roomsLoading,
      };
    case "GET_ROOMS_FAILURE":
      return {
        ...state,
        rooms: [],
        roomsLoading: false,
      };

    case "ADD_ROOM":
      return {
        ...state,
        rooms: [...state.rooms, payload],
      };
    case "DELETE_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== payload),
        roomsLoading: false,
      };
    case "FIND_ROOM":
      return {
        ...state,
        room: payload,
        roomsLoading: false,
      };
    case "UPDATE_ROOM":
      const newRooms = state.rooms.map((room) => {
        if (room._id === payload._id) {
          return payload;
        } else {
          return room;
        }
      });
      return {
        ...state,
        rooms: newRooms,
        roomsLoading: false,
      };

    case "SEARCH_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((room) =>
          room.name.toLocaleLowerCase().includes(payload)
        ),
        roomsLoading: false,
      };

    default:
      return state;
  }
};
