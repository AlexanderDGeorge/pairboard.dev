import { User } from "../../types/user_types";
import { updateUserCandidates } from "../../firebase/session";

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
    uid: User["uid"],
    connection?: RTCPeerConnection
) {
    if (!connection) return;

    const iceCandidates: Array<RTCIceCandidateInit> = [];

    connection.onnegotiationneeded = () => {
        console.log("negotiation needed...");
    };

    connection.onicecandidate = async ({ candidate }) => {
        if (candidate) {
            iceCandidates.push(candidate.toJSON());
        } else {
            console.log("submitting ice candidates...");
            updateUserCandidates(iceCandidates, uid);
        }
    };

    connection.ontrack = () => {
        console.log("in track listener");
    };

    connection.onsignalingstatechange = (state) => {
        console.log(state);
    };
}

export function setConnectionDescriptions(
    connection: RTCPeerConnection,
    description: RTCSessionDescriptionInit,
    polite: boolean,
    makingOffer: boolean
) {
    const offerCollision =
        description.type === "offer" &&
        (makingOffer || connection.signalingState !== "stable");
    if (!polite && offerCollision) return;
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
