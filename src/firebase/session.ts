import { firestore, fieldValue } from "./firebase";
import { Session, NewSession } from "../types/session_types";
import { UserLite } from "../types/user_types";
import { peerConnection } from "../util/useSessionState";

const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer.sdp;
};

const createAnswer = async (offer: string) => {
    await peerConnection.setRemoteDescription({
        type: "offer",
        sdp: offer,
    });
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);
    return answer.sdp;
};

export async function joinSession(user: UserLite, session: Session) {
    firestore()
        .collection("sessions")
        .doc(session.id)
        .update({
            answer: await createAnswer(session.offer),
            answerUser: user,
        });
    firestore().collection("users").doc(user.uid).update({
        sessionId: session.id,
    });
}

export async function createNewSession(user: UserLite, newSession: NewSession) {
    const sessionRef = firestore().collection("sessions").doc();
    await sessionRef.set({
        ...newSession,
        id: sessionRef.id,
        createdAt: new Date(),
        offer: await createOffer(),
        offerUser: user,
    });
    firestore().collection("users").doc(user.uid).update({
        sessionId: sessionRef.id,
    });
}

export async function updateSession(updatedSession: Session) {
    await firestore()
        .collection("sessions")
        .doc(updatedSession.id)
        .update({
            ...updateSession,
            createdAt: new Date(),
        });
}

export function deleteSession(session: Session) {
    if (session.answerUser) {
        firestore().collection("users").doc(session.answerUser.uid).update({
            sessionId: fieldValue.delete(),
        });
    }
    firestore().collection("users").doc(session.offerUser.uid).update({
        sessionId: fieldValue.delete(),
    });
    firestore().collection("sessions").doc(session.id).delete();
}

export async function fetchSessions() {
    const sessionsRef = firestore()
        .collection("sessions")
        .orderBy("createdAt", "desc");
    const sessionsDoc = await sessionsRef.get();
    return [...sessionsDoc.docs.map((doc) => doc.data())];
}

export function addOfferCandidate(
    sessionId: Session["id"],
    offerCandidate?: string
) {
    if (!offerCandidate) return;
    firestore().collection("sessions").doc(sessionId).update({
        offerCandidate,
    });
}

export function addAnswerCandidate(
    sessionId: Session["id"],
    answerCandidate?: string
) {
    if (!answerCandidate) return;
    firestore().collection("sessions").doc(sessionId).update({
        answerCandidate,
    });
}
