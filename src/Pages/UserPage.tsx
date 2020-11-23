import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { fetchUserDocFromUsername } from "../firebase/user";
import Loading from "./LoadingPage";
import LargeUserCard from "../Components/User/LargeUserCard";
import Posts from "../Components/User/Posts";
import { UserSchema } from "../firebase/schema";
import convertDocToUser from "../Components/User/convertDocToUser";

export default function UserPage(props: { user?: UserSchema }) {
    const pathname = useLocation().pathname.slice(6);
    const [user, setUser] = useState<UserSchema | undefined | null>(props.user);

    useEffect(() => {
        if (user || user === null) return;
        (async () => {
            const userDoc = await fetchUserDocFromUsername(pathname);
            console.log(userDoc);
            if (userDoc) {
                setUser(convertDocToUser(userDoc));
            } else {
                setUser(null);
            }
        })();
    }, [pathname, user]);

    if (user) {
        return (
            <StyledUserPage>
                <LargeUserCard user={user} />
                <Posts user={user} />
            </StyledUserPage>
        );
    } else if (user === null) {
        return (
            <StyledUserPage>
                <h1>User Not Found</h1>
            </StyledUserPage>
        );
    } else {
        return <Loading />;
    }
}

const StyledUserPage = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 100px 10%;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.verylight};
`;
