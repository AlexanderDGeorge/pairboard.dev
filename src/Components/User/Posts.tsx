import React from "react";
import { firestore } from "../../firebase/firebase";
import { UserSchema } from "../../firebase/schema";
import PostLane from "../Post/PostLane";

export default function Posts(props: { user: UserSchema }) {
    const { username } = props.user;

    return (
        <PostLane
            name="user posts"
            query={firestore()
                .collection("posts")
                .where("host.username", "==", username)}
        />
    );
}
