import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Application";
import { User } from "../types/user_types";
export default (props: { user?: User }) => {
    const { photoURL, username, score, firstname, lastname, bio } =
        props.user || useContext(UserContext)!;

    return (
        <ProfileHeader>
            <img src={photoURL} alt="" />
            <div>
                <h1>
                    {username} | {score}
                </h1>
                <h3>
                    {firstname} {lastname}
                </h3>
                <h3>{bio}</h3>
            </div>
        </ProfileHeader>
    );
};

const ProfileHeader = styled.div`
    position: relative;
    padding: 5%;
    display: flex;
    > img {
        @media screen and (max-width: 500px) {
            height: 100px;
            width: 100px;
        }
        height: 200px;
        width: 200px;
        border-radius: 5px;
        margin-right: 5%;
        border: 1px solid ${(props) => props.theme.light};
    }
    > div {
        width: 40%;
        display: flex;
        flex-direction: column;
        > h1,
        h3 {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            > svg {
                margin-right: 10px;
            }
        }
    }
`;
