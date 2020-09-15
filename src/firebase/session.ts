import { firestore, fieldValue } from "./firebase";
import { Session, NewSession } from "../types/session_types";
import { UserLite } from "../types/user_types";

export async function createSession(user: UserLite, newSession: NewSession) {
    const sessionRef = firestore().collection("sessions").doc();
    await sessionRef.set({
        ...newSession,
        author: user,
        id: sessionRef.id,
        createdAt: new Date(),
        users: fieldValue.arrayUnion(user.uid),
    });
    await firestore().collection("users").doc(user.uid).update({
        sessionId: sessionRef.id,
    });
}

export async function updateSession(updatedSession: Session) {
    await firestore()
        .collection("sessions")
        .doc(updatedSession.id)
        .update({
            ...updatedSession,
            createdAt: new Date(),
        });
}

export async function joinSession(uid: UserLite["uid"], sessionId: string) {
    const sessionRef = firestore().collection("sessions").doc(sessionId);
    await sessionRef.update({
        users: fieldValue.arrayUnion(uid),
    });
    await firestore().collection("users").doc(uid).update({
        sessionId,
    });
}

export async function updateUserDescription(
    description: RTCSessionDescriptionInit,
    uid: UserLite["uid"]
) {
    const userRef = firestore().collection("users").doc(uid);
    await userRef.update({
        description,
    });
}

export async function updateUserCandidates(
    candidates: Array<RTCIceCandidateInit>,
    uid: UserLite["uid"]
) {
    const userRef = firestore().collection("users").doc(uid);
    await userRef.update({
        candidates,
    });
}

export async function sendOffer(offer: string, sessionId: string) {
    const sessionRef = firestore().collection("sessions").doc(sessionId);
    await sessionRef.update({
        offer,
    });
}

export async function sendAnswer(answer: string, sessionId: string) {
    const sessionRef = firestore().collection("sessions").doc(sessionId);
    await sessionRef.update({
        answer,
    });
}

export async function sendOfferCandidates(
    candidates: Array<RTCIceCandidateInit>,
    sessionId: string
) {
    const sessionRef = firestore().collection("sessions").doc(sessionId);
    await sessionRef.update({
        offerCandidates: candidates,
    });
}

export async function sendAnswerCandidates(
    candidates: Array<RTCIceCandidateInit>,
    sessionId: string
) {
    const sessionRef = firestore().collection("sessions").doc(sessionId);
    await sessionRef.update({
        answerCandidates: candidates,
    });
}

////////////

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
