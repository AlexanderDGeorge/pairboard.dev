import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { UserSchema } from "../firebase/schema";

export default (uid: string | null) => {
    const [user, setUser] = useState<UserSchema | undefined>(undefined);

    useEffect(() => {
        if (!uid) return;
        const unsubscribe = firestore()
            .collection("users")
            .doc(uid)
            .onSnapshot((snapshot) => {
                const data = snapshot?.data();
                if (!data) return;
                setUser({
                    uid: snapshot.id,
                    blurb: data.blurb,
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    photoURL: data.photoURL,
                    score: data.score,
                    status: data.status,
                    sessionId: data.sessionId,
                    username: data.username,
                });
            });
        return () => {
            unsubscribe();
        };
    }, [uid]);

    return user;
};
