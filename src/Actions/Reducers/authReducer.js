const authReducer = (state, action) => {
    switch (action.type) {
        case "MAKE_REQUEST":
            return { ...state, isPending: true };

        case "LOGIN":
            return {
                ...state,
                isPending: false,
                accessToken: action.token,
                error: action.error,
            };
        case "REFRESHED_TOKEN":
            return {
                ...state,
                accessToken: action.token,
                error: action.error,
            };

        case "FETCHED_USER":
            return {
                ...state,
                user: action.user,
            };

        case "LOGOUT":
            return {
                ...state,
                user: {},
                accessToken: undefined,
            };

        default:
            return state;
    }
};

export default authReducer;
