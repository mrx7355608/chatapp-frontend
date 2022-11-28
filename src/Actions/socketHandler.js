/* eslint-disable no-param-reassign */
export default (socket, token, roomid, toast) => {
    socket.auth = { token, roomid };
    socket.connect();

    // Error while connecting to socket server
    socket.on("connect_error", (data) => console.log(data));

    // Join room as socket
    socket.emit("room:join");

    // When a new user joins
    socket.on("room:new-user-joined", (data) => {
        toast({
            title: `${data.username} has joined the room`,
            status: "info",
            duration: 2000,
        });
    });

    // When a user leaves the room
    socket.on("room:user-left", (data) => {
        toast({
            title: `${data.username} disconnected`,
            status: "error",
            duration: 2000,
        });
    });
};
