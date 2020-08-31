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
const peerConnection = new RTCPeerConnection(configuration);

function setupPeerConnection(session: Session, currentUser: User) {
    if (session.offerUser.uid === currentUser.uid) {
        peerConnection.setLocalDescription({
            type: "offer",
            sdp: session.offer,
        });
        if (session.answer) {
            peerConnection.setRemoteDescription({
                type: "answer",
                sdp: session.answer,
            });
        }
    } else {
        peerConnection.setLocalDescription({
            type: "answer",
            sdp: session.answer,
        });
        peerConnection.setRemoteDescription({
            type: "offer",
            sdp: session.offer,
        });
    }
}

export default (currentUser?: User | null) => {
    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
        if (session && currentUser) {
            setupPeerConnection(session, currentUser);
        }
        // eslint-disable-next-line
    }, [session]);

    useEffect(() => {
        let unsubscribe = () => {};
        if (currentUser?.sessionId) {
            unsubscribe = firestore()
                .collection("sessions")
                .doc(currentUser.sessionId)
                .onSnapshot((snapshot) => {
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
