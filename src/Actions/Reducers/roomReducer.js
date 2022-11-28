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

        case "NEW_USER":
            // eslint-disable-next-line no-case-declarations
            const newUsers = state.room.users.push(action.user);
            return { ...state, room: { ...state.room, users: newUsers } };
        default:
            return state;
    }
};

export default roomReducer;
