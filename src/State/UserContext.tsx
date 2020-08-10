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
                                    photoURL: data.photoURL,
                                    email: data.email,
                                    username: data.username,
                                    experience: data.experience,
                                    darkMode: data.darkMode,
                                    status: data.status,
                                    score: data.score,
                                    sessions: data.sessions,
                                    friends: data.friends,
                                    search: data.search,
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
