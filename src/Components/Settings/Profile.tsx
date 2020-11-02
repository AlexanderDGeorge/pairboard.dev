import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { StyledField } from '../../styled-components/formStyles';

export default function Profile() {
    const user = useContext(UserContext)!;
    const [username, setUsername] = useState(user.username);
    const [blurb, setBlurb] = useState(user.blurb);

    return (
        <ProfileSettings>
            <h1>Profile</h1>

            <StyledField>
                <label htmlFor="username">username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </StyledField>
            <StyledField>
                <label htmlFor="blurb">blurb</label>
                <input type="text" value={blurb} onChange={e => setBlurb(e.target.value)}/>
            </StyledField>
        </ProfileSettings>
    )
}

const ProfileSettings = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
    > h1 {
        margin-bottom: 10px;
        font-weight: 800;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
`;
