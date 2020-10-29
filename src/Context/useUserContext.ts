import { useEffect, useState } from "react";
import convertDocToUser from "../Components/User/convertDocToUser";
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
                        ...convertDocToUser(data),
                        emailVerified: authUser.emailVerified,
                    });
                });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return user;
}
