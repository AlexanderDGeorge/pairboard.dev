import React from "react";
import styled from "styled-components";
import { UserSchema } from "../../firebase/schema";

export default function Header(props: { user: UserSchema }) {
    const { photoURL, username, blurb } = props.user;

    return (
        <StyledHeader>
            <img src={photoURL} alt="profile" />
            <div>
                <h1>{username}</h1>
                <p>{blurb}</p>
            </div>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    > img {
        height: 200px;
        width: 200px;
        margin-right: 10px;
        border: 1px solid ${(props) => props.theme.accent};
        border-radius: 50%;
        box-shadow: 0 5px 20px -12px ${(props) => props.theme.verydark};
    }
    > div {
        width: 100%;
        > h1 {
            display: flex;
            margin-bottom: 10px;
            font-weight: 500;
            font-size: 3em;
            color: transparent;
            background: ${(props) =>
                `linear-gradient(45deg, ${props.theme.green}, ${props.theme.blue})`};
            background-clip: text;
            -webkit-background-clip: text;
        }
        > p {
            margin-left: 10px;
            font-weight: 100;
        }
    }
`;
