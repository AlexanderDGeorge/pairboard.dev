import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Application";

export default () => {
    const currentUser = useContext(UserContext);

    return (
        <ProfileHeader>
            <img src={currentUser?.photoURL} alt="" />
            <div>
                <h1>{currentUser?.username || "Username"}</h1>
                <h3>
                    {currentUser?.experience} | {currentUser?.score}
                </h3>
                <h3>{currentUser?.company || "company"}</h3>
                <h3>{currentUser?.bio}</h3>
                <h3>{currentUser?.links}</h3>
            </div>
        </ProfileHeader>
    );
};

const ProfileHeader = styled.div`
    position: relative;
    padding: 5%;
    display: flex;
    > img {
        height: 200px;
        width: 200px;
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
