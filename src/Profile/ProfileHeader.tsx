import React from "react";
import styled from "styled-components";
import { useUserContext } from "../State/UserContext";
import DarkModeToggle from "./Components/DarkModeToggle";

export default () => {
    const currentUser = useUserContext();

    return (
        <ProfileHeader>
            <img src={currentUser?.photoURL} alt="" />
            <div>
                <h1>{currentUser?.username || "Username"}</h1>
                <h3>{currentUser?.email}</h3>
                <h3>
                    {currentUser?.experience} | {currentUser?.score}
                </h3>
                <h3>{currentUser?.bio}</h3>
                <h3>{currentUser?.links}</h3>
                <DarkModeToggle />
            </div>
        </ProfileHeader>
    );
};

const ProfileHeader = styled.div`
    position: relative;
    padding: 5%;
    display: flex;
    > img {
        height: 250px;
        width: 250px;
        border-radius: 50%;
        margin-right: 10%;
        border: 1px solid ${(props) => props.theme.light};
    }
    > div {
        display: flex;
        flex-direction: column;
        > h1,
        h3 {
            margin-bottom: 20px;
        }
    }
`;
