import { database } from "./firebase";
import { UserSchema } from "./schema";

export async function sendSDP(
    to: UserSchema["uid"],
    offer: RTCSessionDescriptionInit,
    username: UserSchema["username"]
) {
    await database()
        .ref("/notifications/" + to)
        .update({
            from: username,
            ...offer,
        });
}

export async function sendICECandidate(
    to: UserSchema["uid"],
    iceCandidate: RTCIceCandidateInit,
    username: UserSchema["username"]
) {
    await database()
        .ref("/notifications/" + to)
        .update({
            from: username,
            ...iceCandidate,
        });
}
