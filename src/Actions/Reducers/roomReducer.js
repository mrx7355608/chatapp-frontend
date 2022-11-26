const roomReducer = (state, action) => {
    switch (action.type) {
        case "ERROR":
            return { ...state, loading: false, error: action.error };

        case "ROOM_FETCHED":
            return {
                ...state,
                loading: false,
                room: action.room,
                error: undefined,
            };
        case "RETRY":
            return { ...state, askPassword: true, error: undefined };

        case "ASK_PASSWORD":
            return {
                ...state,
                askPassword: false,
                error: undefined,
                loading: true,
            };

        default:
            return state;
    }
};

export default roomReducer;
