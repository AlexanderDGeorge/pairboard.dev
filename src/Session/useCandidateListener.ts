import { useContext, useEffect } from "react";
import { peerConnection } from "../util/useSessionState";
import { UserContext, SessionContext } from "../Application";
import { addOfferCandidate, addAnswerCandidate } from "../firebase/session";

export default () => {
    const { uid } = useContext(UserContext)!;
    const { id, offerUser, offerCandidate, answerCandidate } = useContext(
        SessionContext
    )!;

    useEffect(() => {
        peerConnection.addEventListener("icecandidate", (event) => {
            const candidate = event.candidate;
            uid === offerUser.uid
                ? addOfferCandidate(id, JSON.stringify(candidate))
                : addAnswerCandidate(id, JSON.stringify(candidate));
        });
    }, [uid, offerUser.uid, id]);

    useEffect(() => {
        if (uid === offerUser.uid && answerCandidate) {
            peerConnection.addIceCandidate(JSON.parse(answerCandidate));
        }
    }, [answerCandidate, uid, offerUser.uid]);

    useEffect(() => {
        if (uid !== offerUser.uid && offerCandidate) {
            peerConnection.addIceCandidate(JSON.parse(offerCandidate));
        }
    }, [offerCandidate, uid, offerUser.uid]);
};
