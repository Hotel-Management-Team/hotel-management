export const chargeReducer = (state, action) => {
  const {
    type,
    payload: { charges, chargeLoading, charge, msg, type: toastType },
  } = action;

  switch (type) {
    case "GET_CHARGE_SUCCESS":
      return {
        ...state,
        charges,
        chargeLoading,
      };

    case "GET_CHARGE_FAILURE":
      return {
        ...state,
        charges,
        chargeLoading,
      };

    case "ADD_CHARGE":
      return {
        ...state,
        charge,
      };

    default:
      return state;
  }
};
