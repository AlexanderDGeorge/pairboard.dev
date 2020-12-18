import React, { useContext } from 'react';
import styled from 'styled-components';
import { DevPublicProfile } from '../devSchema';
import DevLinks from './DevLinks';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../Application';
import { StyledH1 } from '../../styled-components/StyledHeadings';
import ConnectionButton from './ConnectionButton';

export default function ProfileCard(props: { dev: DevPublicProfile }) {
    const { image_url, username, bio, name, location } = props.dev;
    const { handleModal } = useContext(ModalContext)!;

    return (
        <StyledProfileCard
            // to={`/dev/${username}`}
            onClick={(e) => {
                handleModal();
                e.stopPropagation();
            }}
        >
            <img src={image_url} alt="profile" />
            <StyledInfoPane>
                <StyledH1>{username}</StyledH1>
                <h2>{name}</h2>
                <p>{bio}</p>
                {location ? <div>{location}</div> : null}
            </StyledInfoPane>
            <ConnectionButton dev={props.dev} />
            <DevLinks dev={props.dev} />
        </StyledProfileCard>
    );
}

const StyledProfileCard = styled.div`
    position: relative;
    min-height: 100px;
    height: 16vw;
    width: 100%;
    margin: 10px 0;
    border-radius: 2vw;
    background-color: ${(props) => props.theme.white};
    box-shadow: 0 5px 20px -8px ${(props) => props.theme.verydark};
    display: flex;
    overflow: hidden;
    text-decoration: none;
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
    }
    &:hover {
        box-shadow: 0 5px 20px -8px ${(props) => props.theme.white};
    }
`;

const StyledInfoPane = styled.div`
    min-width: 200px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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
