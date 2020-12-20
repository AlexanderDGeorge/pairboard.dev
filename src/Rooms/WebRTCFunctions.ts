import { sendICECandidate, sendSessionDescription } from '../firebase/room';
import { database } from '../firebase';
import { DevPublicProfile } from '../Devs/devSchema';

const configuration: RTCConfiguration = {
    iceServers: [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

export async function initiateLocalStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
            facingMode: 'user',
            aspectRatio: 1280 / 720,
        },
    });
    return stream;
}

export async function initiateConnection(localStream: MediaStream) {
    try {
        const pc = new RTCPeerConnection(configuration);
        pc.addTransceiver(localStream.getAudioTracks()[0], {
            direction: 'sendonly',
        });
        pc.addTransceiver(localStream.getVideoTracks()[0], {
            direction: 'sendonly',
            sendEncodings: [
                { rid: 'q', scaleResolutionDownBy: 4.0 },
                { rid: 'h', scaleResolutionDownBy: 2.0 },
                { rid: 'f' },
            ],
        });
        return pc;
    } catch (error) {
        console.error(error.message);
    }
}

export async function listenForConnectionEvents(
    connection: RTCPeerConnection,
    peerId: DevPublicProfile['uid'],
    uid: DevPublicProfile['uid'],
    remoteStreamRef: HTMLVideoElement,
) {
    const polite = uid > peerId;
    let makingOffer = false;
    let ignoreOffer = false;
    let isSettingRemoteAnswerPending = false;

    connection.onnegotiationneeded = async () => {
        console.log('negotiation needed');
        try {
            makingOffer = true;
            // @ts-ignore
            await connection.setLocalDescription();
            sendSessionDescription(peerId, uid, connection.localDescription!);
            console.log(connection.localDescription);
        } catch (error) {
            console.error(error.message);
        } finally {
            makingOffer = false;
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

    database()
        .ref(`/roomNotifications/${uid}/${peerId}/sessionDescription`)
        .on('value', async (snapshot) => {
            if (!snapshot.exists()) return;
            const description = snapshot.val();
            console.log(description);

            const readyForOffer =
                !makingOffer &&
                (connection.signalingState === 'stable' ||
                    isSettingRemoteAnswerPending);
            const offerCollision =
                description.type === 'offer' && !readyForOffer;

            ignoreOffer = !polite && offerCollision;
            if (ignoreOffer) return;

            isSettingRemoteAnswerPending = description.type === 'answer';

            await connection.setRemoteDescription(description);
            isSettingRemoteAnswerPending = false;
            if (description.type === 'offer') {
                // @ts-ignore
                await connection.setLocalDescription();
                sendSessionDescription(
                    peerId,
                    uid,
                    connection.localDescription!,
                );
            }
        });
}

export async function initiateScreenShare() {
    // @ts-ignore
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            cursor: 'motion',
        },
        audio: false,
    });
    return stream;
}
