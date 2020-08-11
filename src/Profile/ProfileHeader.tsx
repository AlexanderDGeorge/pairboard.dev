import React from "react";
import styled from "styled-components";
import { useUserContext } from "../State/UserContext";

export default () => {
    const currentUser = useUserContext();

    return (
        <ProfileHeader>
            <img src={currentUser?.photoURL} alt="" />
            <div>
                <h2>{currentUser?.username || currentUser?.email}</h2>
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
    }
`;
