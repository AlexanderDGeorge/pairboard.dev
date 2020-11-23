import React from "react";
import { MdLocationOn } from "react-icons/md";
import styled from "styled-components";
import { UserSchema } from "../../firebase/schema";
import ConnectionButton from './ConnectionButton';
import UserLinks from './UserLinks';

export default function LargeUserCard(props: { user: UserSchema }) {
    const { photoURL, username, blurb, name, location } = props.user;

    return (
        <StyledLargeUserCard>
            <img src={photoURL} alt="profile" />
            <StyledInfoPane>
                <h1>{username}</h1>
                <h2>{name}</h2>
                <ConnectionButton user={props.user}/>
                <p>{blurb}</p>
                {location ? <StyledLink><MdLocationOn /> {location}</StyledLink> : null}
            </StyledInfoPane>
            <UserLinks user={props.user}/>
        </StyledLargeUserCard>
    );
}

const StyledLargeUserCard = styled.header`
    position: relative;
    width: 100%;
    display: flex;
    border-radius: 40px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: ${props => props.theme.white};
    box-shadow: 0 5px 20px -12px ${(props) => props.theme.verydark};
    overflow: hidden;
    > img {
        height: 250px;
        width: 250px;
        margin-right: 30px;
        border: 2px solid ${(props) => props.theme.medium};
        border-radius: 50%;
    }
`;

const StyledInfoPane = styled.div`
    width: 100%;
    max-width: 500px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > h1 {
        display: flex;
        font-weight: 500;
        font-size: 3em;
        color: transparent;
        background: ${(props) =>
            `linear-gradient(45deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
    }
    > * {
        margin-bottom: 5px;
    }
`;

const StyledLink = styled.a`
    width: 100%;
    display: flex;
    align-items: center;
    > svg {
        height: 20px;
        width: auto;
        margin-right: 10px;
    }
`;