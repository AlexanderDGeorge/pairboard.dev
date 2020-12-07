import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdSend, MdLink } from 'react-icons/md';
import styled from 'styled-components';
import { UserSchema } from '../../firebase/schema';

export default function UserLinks(props: { user: UserSchema }) {
    const { personalURL, githubURL, linkedInURL } = props.user;

    return (
        <StyledUserLinks>
            <StyledLink 
                style={{ background: '#555' }}
                href={personalURL}
            >
                <MdLink />
            </StyledLink>
            <StyledLink 
                style={{ background: '#333'}}
            >
                <MdSend />
            </StyledLink>
            <StyledLink 
                style={{ background: 'black' }}
                href={githubURL}
            >
                <FaGithub />
            </StyledLink>
            <StyledLink 
                style={{ background: '#0072b1' }}
                href={linkedInURL}
            >
                <FaLinkedin />
            </StyledLink>
        </StyledUserLinks>
    )
}

const StyledUserLinks = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledLink = styled.a`
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg{
        height: 30px;
        width: auto;
        fill: ${props => props.theme.white};
    }
`;