import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Application";
import { FaBriefcase, FaCouch } from "react-icons/fa";
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
                        <FaBriefcase /> {currentUser?.company}
                    </h3>
                ) : null}
                {currentUser?.location ? (
                    <h3>
                        <FaCouch /> {currentUser?.location}
                    </h3>
                ) : null}
            </div>
            <div></div>
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
