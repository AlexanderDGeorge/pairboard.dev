import React, { useContext, useState } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { auth } from '../../firebase/firebase';
import { StyledField, StyledButton, StyledLiButtonWrapper } from '../../styled-components/formStyles';

export default function Email() {
    const user = useContext(UserContext)!;
    const [email, setEmail] = useState(user.email);
    const [error, setError] = useState('');

    async function handleVerifyEmail() {
        try {
            await auth.currentUser?.sendEmailVerification();
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    }

    async function handleChangeEmail() {
        try {
            await auth.currentUser?.updateEmail(email);
        } catch (error) {
            setError(error.message);

            console.error(error.message)
        }
    }

    return (
        <StyledEmail>
            <h1>Email</h1>
            <StyledField>
                <label htmlFor="email">email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} pattern={'/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i'} />
                {user.emailVerified ? <MdVerifiedUser /> : null}
                <p>{error}</p>
            </StyledField>
            <StyledLiButtonWrapper>
            <StyledButton onClick={handleChangeEmail} disabled={email === user.email}>
                Change Email Address
            </StyledButton>

            <StyledButton onClick={handleVerifyEmail} disabled={user.emailVerified}>
                Verify Email Address
            </StyledButton>
            {user.emailVerified ? 
            <li>your email address has been verified</li>
            : <li>verify your email address to receive important information about your account and receive email notifications</li>
            }
            </StyledLiButtonWrapper>
        </StyledEmail>
    )
}

const StyledEmail = styled.ul`
    height: 100%;
    width: 100%;
    padding: 10px;
    list-style-position: outside;
    > h1 {
        margin-bottom: 10px;
        font-weight: 800;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
    svg {
        fill: ${props => props.theme.green};
    }
`;