import { firestore } from "./firebase";

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

let peerConnection: RTCPeerConnection;

export async function createRoom() {
    // const roomRef = firestore().collection("rooms");

    peerConnection = new RTCPeerConnection(configuration);

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log(peerConnection);
}
