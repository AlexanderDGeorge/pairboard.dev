import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { fetchUserDocFromUsername } from "../firebase/user";
import Loading from "./LoadingPage";
import Profile from "../Components/Profile/Profile";

export default () => {
    const pathname = useLocation().pathname.slice(6);
    const [user, setUser] = useState<any>(undefined);

    useEffect(() => {
        (async () => {
            const userDoc = await fetchUserDocFromUsername(pathname);
            setUser(userDoc);
        })();
    }, [pathname]);

    console.log(user);

    if (user) {
        return (
            <UserPage>
                <Profile user={user} />
            </UserPage>
        );
    } else {
        return <Loading />;
    }
};

const UserPage = styled.div`
    width: 100%;
    padding: 2% 10%;
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;
