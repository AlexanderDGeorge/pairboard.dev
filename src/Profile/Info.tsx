import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { UserSchema } from "../firebase/schema";
import { UserContext } from "../Root";
import { StyledButton } from "../styled-components/formStyles";
import { MdLocationOn, MdLink } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default (props: { user: UserSchema }) => {
    const { user } = props;
    const { username } = useContext(UserContext)!;
    const score = useSpring({ number: user.score, from: { number: 0 } });
    const history = useHistory();

    console.log(user);

    return (
        <ProfileHeader>
            <img src={user.photoURL} alt="" />
            <h2>
                {user.username} |
                <animated.span>
                    {score.number.interpolate((number) => Math.floor(number))}
                </animated.span>
            </h2>
            <h4>{user.blurb}</h4>
            {user.username === username ? (
                <StyledButton onClick={() => history.replace("/profile/edit")}>
                    Edit Profile
                </StyledButton>
            ) : null}
            <h4>
                <MdLocationOn /> {user.location}
            </h4>
            <a href={`//${user.portfolioURL}`}>
                <MdLink />
                {user.portfolioURL}
            </a>
            <a href={`//${user.githubURL}`}>
                <FaGithub />
                {user.githubURL}
            </a>
            <a href={`//${user.linkedInURL}`}>
                <FaLinkedin />
                {user.linkedInURL}
            </a>
        </ProfileHeader>
    );
};

const ProfileHeader = styled.div`
    height: 100%;
    /* width: 240px; */
    margin-right: 10px;
    border-right: 1px solid ${(props) => props.theme.verylight};
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        height: auto;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
    }
    > img {
        height: 250px;
        width: 250px;
        border: 1px solid ${(props) => props.theme.accent};
        background-color: ${(props) => props.theme.accent};
        @media screen and (max-width: 600px) {
            height: 150px;
            width: 150px;
        }
    }
    > h2,
    h4 {
        display: flex;
        align-items: center;
        /* @media screen and (max-width: 600px) {
            width: 40%;
        } */
    }
    > a {
        display: flex;
        align-items: center;
        font-size: 1em;
    }
    svg {
        height: auto;
        min-width: 20px;
        margin-right: 5px;
    }
    > * {
        margin-bottom: 20px;
        line-height: 1.4em;
        @media screen and (max-width: 600px) {
            margin-bottom: 10px;
        }
    }
`;
