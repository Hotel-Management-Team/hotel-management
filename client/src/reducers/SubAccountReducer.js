export const SubAccountReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_SUB_ACCOUNT_SUCCESS":
      return {
        ...state,
        subAccounts: payload.subAccounts,
        subAccountLoading: payload.subAccountLoading,
      };

    case "GET_SUB_ACCOUNT_FAILURE":
      return {
        ...state,
        subAccounts: [],
        subAccountLoading: payload.subAccountLoading,
      };
    case "ADD_SUB_ACCOUNT":
      return {
        ...state,
        subAccounts: [...state.subAccounts, payload],
      };
    case "FIND_SUB_ACCOUNT":
      return {
        ...state,
        subAccount: payload,
        subAccountLoading: false,
      };
    case "DELETE_SUB_ACCOUNT":
      return {
        ...state,
        subAccounts: state.subAccounts.filter(
          (subAccount) => subAccount._id !== payload
        ),
        subAccountLoading: false,
      };
    case "UPDATE_SUB_ACCOUNT":
      const newSubAccounts = state.subAccounts.map((subAccount) => {
        if (subAccount._id === payload._id) {
          payload.subAccountName = subAccount.subAccountName;
          return payload;
        } else {
          return subAccount;
        }
      });
      return {
        ...state,
        subAccounts: newSubAccounts,
        subAccountLoading: false,
      };
    default:
      return state;
  }
};
