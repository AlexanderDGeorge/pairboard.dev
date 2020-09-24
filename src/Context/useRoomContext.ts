import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { RoomSchema } from "../firebase/schema";

export default (roomId: RoomSchema["id"]) => {
    const [room, setRoom] = useState<RoomSchema | undefined>(undefined);

    useEffect(() => {
        if (!roomId) return;

        // [TODO]: use doc changes to limit reads
        const unsubscribe = firestore()
            .collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => {
                const data = snapshot?.data();
                if (!data) return;
                setRoom({
                    id: snapshot.id,
                    candidates: data.candidates,
                    offers: data.offers,
                });
            });
        return () => {
            unsubscribe();
        };
    }, [roomId]);

    return room;
};
