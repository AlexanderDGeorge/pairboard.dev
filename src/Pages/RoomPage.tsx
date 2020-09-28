import React, { useContext, useEffect, useState } from "react";
import usePostContext from "../Context/usePostContext";
import { initiateLocalStream } from "../firebase/room";
import LocalStream from "../Room/LocalStream";
import PeerConnection from "../Room/PeerConnection";
import { UserContext } from "../Root";

export default () => {
    const { uid, postId } = useContext(UserContext)!;
    const post = usePostContext(postId);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined
    );

    useEffect(() => {
        (async () => {
            setLocalStream(await initiateLocalStream());
        })();
    }, []);

    if (post) {
        return (
            <div>
                {post.participants.map((participantId, i) => {
                    if (uid !== participantId) {
                        return (
                            <PeerConnection
                                key={i}
                                localStream={localStream}
                                recipientId={participantId}
                            />
                        );
                    } else {
                        return (
                            <LocalStream key={i} localStream={localStream} />
                        );
                    }
                })}
            </div>
        );
    } else {
        return null;
    }
};
