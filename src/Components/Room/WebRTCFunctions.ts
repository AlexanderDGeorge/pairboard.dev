import { UserSchema } from "../../firebase/schema";
import { sendICECandidate, sendSessionDescription } from "../../firebase/room";

export async function initiateLocalStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
            facingMode: "user",
            aspectRatio: 1280 / 720,
        },
    });
    return stream;
}

export async function initiateVideoStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
            facingMode: "user",
            aspectRatio: 1280 / 720,
        },
    });
    return stream;
}

export async function initiateScreenShare() {
    // @ts-ignore
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            cursor: "motion",
        },
        audio: false,
    });
    return stream;
}

export async function initiateConnection(localStream: MediaStream) {
    // [TODO]: configure turn servers
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
    const localConnection = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach((track) => {
        localConnection.addTrack(track, localStream);
    });
    return localConnection;
}

export async function listenToConnectionEvents(
    connection: RTCPeerConnection,
    peerId: UserSchema["uid"],
    uid: UserSchema["uid"],
    remoteStreamRef: HTMLVideoElement
) {
    connection.onnegotiationneeded = async () => {
        console.log("negotiation needed");
        if (peerId < uid) {
            const offer = await connection.createOffer();
            connection.setLocalDescription(offer);
            sendSessionDescription(peerId, uid, offer);
        }
    };

    connection.onicecandidate = async (iceEvent) => {
        if (iceEvent.candidate) {
            sendICECandidate(peerId, uid, iceEvent.candidate.toJSON());
        }
    };

    connection.ontrack = async (trackEvent) => {
        let remoteStream = new MediaStream();
        if (remoteStreamRef.srcObject instanceof MediaStream) {
            remoteStream = remoteStreamRef.srcObject;
        }
        remoteStream.addTrack(trackEvent.track);
        remoteStreamRef.srcObject = remoteStream;
    };
}
