import { sendCandidates, sendDescription } from "../../firebase/session";
import { Session } from "../../types/session_types";

let makingOffer = false;
let awaitingOffer = false;

export function initiateConnection() {
    const configuration = {
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

    try {
        const pc = new RTCPeerConnection(configuration);
        return pc;
    } catch (error) {
        console.error(error.message);
    }
}

export async function initiateStream(connection?: RTCPeerConnection) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        for (const track of stream.getTracks()) {
            connection?.addTrack(track, stream);
        }
        return stream;
    } catch (error) {
        console.error(error.message);
    }
}

export function listenToConnectionEvents(
    sessionId: Session["id"],
    polite: boolean,
    connection?: RTCPeerConnection
) {
    if (!connection) return;

    const iceCandidates: Array<RTCIceCandidateInit> = [];

    connection.onnegotiationneeded = async () => {
        console.log("negotiation needed...");
        try {
            if (awaitingOffer) return;
            makingOffer = true;
            // @ts-ignore
            await connection.setLocalDescription();
            await sendDescription(
                sessionId,
                polite,
                connection.localDescription?.toJSON()
            );
            awaitingOffer = true;
        } catch (error) {
            console.error(error.message);
        } finally {
            makingOffer = false;
        }
    };

    connection.onicecandidate = async ({ candidate }) => {
        if (candidate) {
            iceCandidates.push(candidate.toJSON());
        } else {
            console.log("submitting ice candidates...");
            sendCandidates(sessionId, polite, iceCandidates);
        }
    };

    connection.ontrack = () => {
        console.log("in track listener");
    };
}

export async function setConnectionDescription(
    id: Session["id"],
    polite: boolean,
    connection: RTCPeerConnection,
    description: RTCSessionDescriptionInit
) {
    const offerCollision =
        description.type === "offer" &&
        (makingOffer || connection.signalingState !== "stable");
    if (!polite && offerCollision) return;

    await connection.setRemoteDescription(description);
    if (description.type === "offer") {
        // @ts-ignore
        await connection.setLocalDescription();
        sendDescription(id, connection.localDescription?.toJSON());
    }

    awaitingOffer = false;
}

export function setConnectionCandidates(
    connection: RTCPeerConnection,
    candidates: Array<RTCIceCandidateInit>
) {
    try {
        candidates.forEach(async (candidate) => {
            await connection.addIceCandidate(candidate);
        });
    } catch (error) {
        console.error(error.message);
    }
}
