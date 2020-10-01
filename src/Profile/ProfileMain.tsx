import React, { useContext } from "react";
import { UserSchema } from "../firebase/schema";
import { UserContext } from "../Root";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

export default (props: { username?: UserSchema["username"] }) => {
    const { username } = useContext(UserContext)!;
    if (props.username && props.username !== username) {
        return (
            <>
                <ProfileHeader username={props.username} />
            </>
        );
    } else {
        return (
            <>
                <ProfileHeader />
                <ProfilePosts />
            </>
        );
    }
};
