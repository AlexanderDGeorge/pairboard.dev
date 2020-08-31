import { useEffect, useState } from "react";
import { firestore, auth } from "../firebase/firebase";
import { User } from "../types/user_types";

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
                                    darkMode: data.darkMode,
                                    email: data.email,
                                    firstname: data.firstname,
                                    lastname: data.lastname,
                                    pairs: data.pairs,
                                    photoURL: data.photoURL,
                                    score: data.score,
                                    sessionId: data.sessionId,
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
