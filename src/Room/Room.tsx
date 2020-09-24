import React from "react";
import useRoomContext from "../Context/useRoomContext";
import { RoomSchema } from "../firebase/schema";

export default (roomId: RoomSchema["id"]) => {
    const room = useRoomContext(roomId);

    return null;
};
