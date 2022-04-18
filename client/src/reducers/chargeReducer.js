export const chargeReducer = (state, action) => {
  const {
    type,
    payload: { charges, chargeLoading },
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

    default:
      return state;
  }
};
