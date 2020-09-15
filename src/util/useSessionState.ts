import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase";
import { Session } from "../types/session_types";
import { User } from "../types/user_types";

export default (sessionId?: User["sessionId"]) => {
    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
        let unsubscribe = () => {};
        if (sessionId) {
            unsubscribe = firestore()
                .collection("sessions")
                .doc(sessionId)
                .onSnapshot((snapshot) => {
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        if (data) {
                            setSession({
                                id: snapshot.id,
                                author: data.author,
                                createdAt: data.createdAt,
                                language: data.language,
                                difficulty: data.difficulty,
                                tags: data.tags,
                                description: data.description,
                                users: data.users,
                            });
                        }
                    }
                });
        } else {
            setSession(undefined);
        }
        return () => {
            unsubscribe();
        };
    }, [sessionId]);

    return session;
};
