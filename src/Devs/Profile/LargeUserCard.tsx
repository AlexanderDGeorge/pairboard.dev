import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import styled from 'styled-components';
import { DevPublicProfile } from '../devSchema';
import ConnectionButton from './ConnectionButton';
import UserLinks from './UserLinks';

export default function LargeUserCard(props: { dev: DevPublicProfile }) {
    const { image_url, username, bio, name, location } = props.dev;

    return (
        <StyledLargeUserCard>
            <img src={image_url} alt="profile" />
            <StyledInfoPane>
                <h1>{username}</h1>
                <h2>{name}</h2>
                <p>{bio}</p>
                {location ? (
                    <div>
                        <MdLocationOn /> {location}
                    </div>
                ) : null}
            </StyledInfoPane>
            <ConnectionButton dev={props.dev} />
            <UserLinks dev={props.dev} />
        </StyledLargeUserCard>
    );
}

const StyledLargeUserCard = styled.header`
    position: relative;
    height: 250px;
    width: 100%;
    border-radius: 40px;
    margin-bottom: 10px;
    display: flex;
    background-color: ${(props) => props.theme.white};
    box-shadow: 0 5px 20px -8px ${(props) => props.theme.verydark};
    overflow: hidden;
    > img {
        height: 250px;
        width: 250px;
        margin-right: 30px;
        border-right: 2px solid ${(props) => props.theme.medium};
    }
`;

const StyledInfoPane = styled.div`
    /* width: 100%; */
    width: 400px;
    margin-right: 30px;
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
    > div {
        width: 100%;
        display: flex;
        align-items: center;
        > svg {
            height: 20px;
            width: auto;
            margin-right: 10px;
        }
    }
    > * {
        margin-bottom: 5px;
    }
`;
