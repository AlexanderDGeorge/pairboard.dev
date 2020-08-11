import { useEffect, useState } from "react";
import { User } from "../firebase/user";
import { firestore, auth } from "../firebase/firebase";

export function useUserContext() {
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

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
                                    friends: data.friends,
                                    darkMode: data.darkMode,
                                    email: data.email,
                                    experience: data.experience,
                                    links: data.links,
                                    photoURL: data.photoURL,
                                    score: data.score,
                                    search: data.search,
                                    sessions: data.sessions,
                                    status: data.status,
                                    username: data.username,
                                });
                            }
                        }
                    });
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return currentUser;
}
