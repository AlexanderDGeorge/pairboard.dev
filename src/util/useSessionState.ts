import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase";
import { Session } from "../types/session_types";
import { User } from "../types/user_types";

const configuration: RTCConfiguration = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

export const peerConnection = new RTCPeerConnection(configuration);

export default (currentUser?: User | null) => {
    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
        let unsubscribe = () => {};
        if (currentUser?.sessionId) {
            unsubscribe = firestore()
                .collection("sessions")
                .doc(currentUser.sessionId)
                .onSnapshot((snapshot) => {
                    console.log(snapshot);
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        if (data) {
                            setSession({
                                id: snapshot.id,
                                answer: data.answer,
                                answerUser: data.answerUser,
                                createdAt: data.createdAt,
                                offer: data.offer,
                                offerUser: data.offerUser,
                                language: data.language,
                                difficulty: data.difficulty,
                                tags: data.tags,
                                description: data.description,
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
    }, [currentUser]);

    return session;
};
