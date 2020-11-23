import React, { useContext, useState } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import styled from 'styled-components';
import { ModalContext, UserContext } from '../../Application';
import { checkForValidEmail } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';
import { StyledField } from '../../styled-components/formStyles';
import { StyledButton, StyledButtonRow } from '../../styled-components/StyledButtons';
import Slider from '../Animated/Slider';
import PasswordModal from '../Modal/PasswordModal';

export default function Email() {
    const user = useContext(UserContext)!;
    const [email, setEmail] = useState(user.email);
    const [emailPublic, setEmailPublic] = useState(user.emailPublic);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');
    const { handleModal } = useContext(ModalContext)!;

    async function handleVerifyEmail() {
        try {
            await auth.currentUser?.sendEmailVerification();
            setEmailSent(true);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleChangeEmail() {
        try {
            const empty = await checkForValidEmail(email);
        if (!empty && email !== user.email) {
            setError('email already in use')
        } else {
            await auth.currentUser?.updateEmail(email);
        }
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                handleModal(<PasswordModal pText='This operation requires reauthorization' submitCallback={handleModal}/>)
            }
            console.error(error)
        }
    }

    return (
        <StyledEmail>
            <h1>Email</h1>
            <StyledField>
                <label htmlFor="email">email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} pattern={'/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i'} />
                {auth.currentUser?.emailVerified ? <MdVerifiedUser /> : null}
                <p>{error}</p>
                {auth.currentUser?.emailVerified ? 
                <li>your email address has been verified</li>
                : <li>verify your email address to receive important information about your account and receive email notifications</li>
                }
            </StyledField>
            <StyledButtonRow>

            <StyledButton onClick={handleChangeEmail} disabled={email === user.email}>
                Change Email Address
            </StyledButton>

            <StyledButton onClick={handleVerifyEmail} disabled={auth.currentUser?.emailVerified || emailSent}>
                    {emailSent ? 'Email Sent' : 'Verify Email Address'}
            </StyledButton>
            </StyledButtonRow>
            <SliderLane>
                <h4>Show email on profile</h4>
                <Slider value={emailPublic} setValue={setEmailPublic}/>
            </SliderLane>
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
        font-size: 3em;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.blue}, 20%, ${props.theme.green})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
    svg {
        fill: ${props => props.theme.green};
    }
`;

const SliderLane = styled.div`
    width: 100%;
    max-width: 600px;
    border-top: 1px solid ${props => props.theme.light};
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;