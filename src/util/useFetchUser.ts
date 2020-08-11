import { useState, useEffect } from "react";
import { User } from "../firebase/user";
import { firestore } from "../firebase/firebase";

export default async (uid: User["uid"]) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("users")
            .doc(uid)
            .onSnapshot(async (snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    if (data) {
                        setUser({
                            uid: snapshot.id,
                            bio: data.bio,
                            company: data.company,
                            darkMode: data.darkMode,
                            email: data.email,
                            experience: data.experience,
                            friends: data.friends,
                            location: data.location,
                            links: data.links,
                            photoURL: data.photoURL,
                            score: data.score,
                            search: data.search,
                            sessions: data.sessions,
                            status: data.status,
                            streak: data.streak,
                            username: data.username,
                        });
                    }
                }
            });
        return () => {
            unsubscribe();
        };
    }, [uid]);
    return user;
};
