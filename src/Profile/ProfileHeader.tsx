import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Application";
import { GoBriefcase, GoLocation } from "react-icons/go";
import { User } from "../firebase/user";

export default (props: { user?: User }) => {
    const currentUser = props.user || useContext(UserContext);

    return (
        <ProfileHeader>
            <img src={currentUser?.photoURL} alt="" />
            <div>
                <h1>{currentUser?.username || currentUser?.email}</h1>
                <h3>
                    {currentUser?.experience} | {currentUser?.score}
                </h3>
                <h3>{currentUser?.bio}</h3>
                {currentUser?.company ? (
                    <h3>
                        <GoBriefcase /> {currentUser?.company}
                    </h3>
                ) : null}
                {currentUser?.location ? (
                    <h3>
                        <GoLocation /> {currentUser?.location}
                    </h3>
                ) : null}
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
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            > svg {
                margin-right: 10px;
            }
        }
    }
`;
