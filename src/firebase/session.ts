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

export async function joinSession(user: UserLite, sessionId: string) {
    const sessionRef = firestore().collection("sessions").doc(sessionId);
    await sessionRef.update({
        peer: user,
    });
    await firestore().collection("users").doc(user.uid).update({
        sessionId,
    });
}

export async function sendCandidates(
    sessionId: Session["id"],
    polite: boolean,
    iceCandidates?: Array<RTCIceCandidateInit>
) {
    if (!iceCandidates) return;

    const sessionRef = firestore().collection("sessions").doc(sessionId);
    if (polite) {
        await sessionRef.update({
            politeCandidates: iceCandidates,
        });
    } else {
        await sessionRef.update({
            impoliteCandidates: iceCandidates,
        });
    }
}

export async function sendDescription(
    sessionId: Session["id"],
    polite: boolean,
    description?: RTCSessionDescriptionInit
) {
    if (!description) return;

    const sessionRef = firestore().collection("sessions").doc(sessionId);
    if (polite) {
        await sessionRef.update({
            politeDescription: description,
        });
    } else {
        await sessionRef.update({
            impoliteDescription: description,
        });
    }
}

export async function fetchSessions() {
    const sessionsRef = firestore()
        .collection("sessions")
        .orderBy("createdAt", "desc");
    const sessionsDoc = await sessionsRef.get();
    return [...sessionsDoc.docs.map((doc) => doc.data())];
}
