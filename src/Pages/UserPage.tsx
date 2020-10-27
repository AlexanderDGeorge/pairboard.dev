import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { fetchUserDocFromUsername } from "../firebase/user";
import Loading from "./LoadingPage";
import Header from "../Components/User/Header";
import ExternalLinks from "../Components/User/ExternalLinks";
import Posts from "../Components/User/Posts";

export default function UserPage() {
    const pathname = useLocation().pathname.slice(6);
    const [user, setUser] = useState<any>(undefined);

    useEffect(() => {
        (async () => {
            const userDoc = await fetchUserDocFromUsername(pathname);
            setUser(userDoc);
        })();
    }, [pathname]);

    if (user) {
        return (
            <StyledUserPage>
                <Header user={user} />
                <ExternalLinks user={user} />
                <Posts user={user} />
            </StyledUserPage>
        );
    } else {
        return <Loading />;
    }
}

const StyledUserPage = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 2% 10%;
    display: flex;
    flex-direction: column;
`;
