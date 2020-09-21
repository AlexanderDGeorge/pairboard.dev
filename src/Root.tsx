import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import LoadingPage from "./Pages/LoadingPage";
import LandingPage from "./Pages/LandingPage";
import App from "./App";
import useUserContext from "./Context/useUserContext";
import { UserSchema } from "./firebase/schema";

export const UserContext = createContext<UserSchema | undefined>(undefined);

export default function Root() {
    const [uid, setUid] = useState<string | null>("loading");
    const user = useUserContext(uid);

    useEffect(() => {
        try {
            auth.onAuthStateChanged((firebaseUser) => {
                if (firebaseUser) {
                    setUid(firebaseUser.uid);
                } else {
                    setUid(null);
                }
            });
        } catch (error) {
            console.error(error.message);
            setUid("error");
        }
    }, []);

    if (user) {
        return (
            <UserContext.Provider value={user}>
                <App />
            </UserContext.Provider>
        );
    } else if (uid === "loading") {
        return <LoadingPage />;
    } else if (uid === null) {
        return <LandingPage />;
    } else {
        // [TODO]: add errorPage
        return null;
    }
}
