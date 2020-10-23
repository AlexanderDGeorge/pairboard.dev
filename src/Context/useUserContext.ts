import { useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { UserSchema } from "../firebase/schema";

export default function useUserContext() {
    const [user, setUser] = useState<UserSchema | undefined | null>(undefined);

    useEffect(() => {
        let unsubscribe: Function;

        auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (!authUser) {
                setUser(null);
                return;
            }
            unsubscribe = firestore()
                .collection("users")
                .doc(authUser.uid)
                .onSnapshot((snapshot) => {
                    const data = snapshot?.data();
                    if (!data) return;
                    setUser({
                        uid: snapshot.id,
                        blurb: data.blurb,
                        connections: data.connections,
                        darkMode: data.darkMode,
                        email: data.email,
                        emailVerified: authUser.emailVerified,
                        firstname: data.firstname,
                        githubURL: data.githubURL,
                        lastname: data.lastname,
                        linkedInURL: data.linkedInURL,
                        location: data.location,
                        photoURL: data.photoURL,
                        portfolioURL: data.portfolioURL,
                        posts: data.posts,
                        score: data.score,
                        status: data.status,
                        postId: data.postId,
                        username: data.username,
                    });
                });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return user;
}
