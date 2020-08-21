import { useEffect, useState } from "react";
import { User } from "../firebase/user";
import { firestore, auth } from "../firebase/firebase";

export default () => {
    const [currentUser, setCurrentUser] = useState<User | undefined | null>(
        undefined
    );

    useEffect(() => {
        let unsubscribe: Function;
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                unsubscribe = firestore()
                    .collection("users")
                    .doc(user.uid)
                    .onSnapshot((snapshot) => {
                        if (snapshot.exists) {
                            const data = snapshot.data();
                            if (data) {
                                setCurrentUser({
                                    uid: snapshot.id,
                                    bio: data.bio,
                                    company: data.company,
                                    darkMode: data.darkMode,
                                    email: data.email,
                                    location: data.location,
                                    links: data.links,
                                    pairs: data.pairs,
                                    photoURL: data.photoURL,
                                    score: data.score,
                                    searchId: data.searchId,
                                    sessions: data.sessions,
                                    status: data.status,
                                    streak: data.streak,
                                    username: data.username,
                                });
                            }
                        }
                    });
            } else {
                setCurrentUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return currentUser;
};
