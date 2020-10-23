import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { firestore } from "../../firebase/firebase";
import { PostSchema, UserSchema } from "../../firebase/schema";
import Post from "../Post/Post";
import convertDocToPost from "../Post/convertDocToPost";
// import { UserContext } from "../../Application";

export default function Posts(props: { user?: UserSchema }) {
    // const { posts } = props.user || useContext(UserContext)!;
    const [userPosts, setUserPosts] = useState<Array<PostSchema>>([]);
    const lastRead: MutableRefObject<any> = useRef(null);

    useEffect(() => {
        if (props.user?.posts.length) {
            (async () => {
                const snapshot = await firestore()
                    .collection("posts")
                    .where("id", "in", props.user?.posts)
                    .orderBy("createdAt")
                    .limit(3)
                    .get();
                if (!snapshot.empty) {
                    lastRead.current = snapshot.docs[snapshot.docs.length - 1];
                    const docs = snapshot.docs.map((doc) => {
                        return convertDocToPost(doc.data());
                    });
                    console.log(docs);
                    setUserPosts(docs);
                }
            })();
        }
    }, [props.user?.posts]);

    return (
        <ProfilePosts>
            {userPosts.map((post: PostSchema, i: number) => {
                return <Post post={post} key={i} />;
            })}
        </ProfilePosts>
    );
}

const ProfilePosts = styled.div`
    height: 100%;
    width: 100%;
`;
