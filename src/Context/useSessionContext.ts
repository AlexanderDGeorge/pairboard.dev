import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { SessionSchema } from "../firebase/schema";

export default (sessionId: string) => {
    const [session, setSession] = useState<SessionSchema | undefined>(
        undefined
    );

    useEffect(() => {
        if (!sessionId) return;
        const unsubscribe = firestore()
            .collection("sessions")
            .doc(sessionId)
            .onSnapshot((snapshot) => {
                const data = snapshot?.data();
                if (!data) return;
                setSession({
                    id: snapshot.id,
                    description: data.description,
                    difficulty: data.difficulty,
                    host: data.host,
                    language: data.language,
                    maxCapacity: data.maxCapacity,
                    participants: data.participants,
                    tags: data.tags,
                });
            });
        return () => {
            unsubscribe();
        };
    });

    return session;
};
