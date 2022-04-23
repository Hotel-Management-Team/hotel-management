export const chargeReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_CHARGE_SUCCESS":
      return {
        ...state,
        charges: payload.charges,
        chargeLoading: payload.chargeLoading,
      };
    case "GET_CHARGE_FAILURE":
      return {
        ...state,
        charges: [],
        chargeLoading: false,
      };
    case "ADD_CHARGE":
      return {
        ...state,
        charges: [...state.charges, payload],
      };
    case "UPDATE_CHARGE":
      const newCharges = state.charges.map((charge) => {
        if (charge._id === payload._id) {
          return payload;
        } else {
          return charge;
        }
      });
      return {
        ...state,
        charges: newCharges,
        chargesLoading: false,
      };
    case "FIND_CHARGE":
      return {
        ...state,
        charge: payload,
      };
    case "DELETE_CHARGE":
      return {
        ...state,
        charges: state.charges.filter((charge) => charge._id !== payload),
      };
    default:
      return state;
  }
};
