

export const authReducer = (state, action) => {
    const {
        type,
        payload: { user, isAuthenticated },
    } = action;
   
    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                user,
                isAuthenticated,
                authLoading: false,
            };


            default:
                return state;
    }
}
