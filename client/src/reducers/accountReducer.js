export const accountReducer = (state, action) => {
    const {
        type,
        payload: { account, accountLoading },
    } = action;

    switch (type) {
        case "GET_ACCOUNT_SUCCESS":
            return {
                ...state,
                account,
                accountLoading,
            };
        case "GET_ACCOUNT_FAILURE":
            return {
                ...state,
                account,
                accountLoading,
            };

        case "UPDATE_ACCOUNT_SUCCESS":
            return {
                ...state,
                account,
                accountLoading,
            };

        case "UPDATE_ACCOUNT_FAILURE":
            return {
                ...state,
                account,
                accountLoading,
            };

        default:
            return state;
    }
};
