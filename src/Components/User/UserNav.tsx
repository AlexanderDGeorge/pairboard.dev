import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';

export default function UserNav(props: { user: UserSchema }) {
    const { uid } = useContext(UserContext)!;

    return (
        <StyledUserNav>
            {props.user.uid === uid ? 
                <>
                    <NavButton>edit</NavButton>
                </>
            : 
                <>
                    <NavButton>message</NavButton>
                    <NavButton>connect</NavButton>
                </>
            }
        </StyledUserNav>
    )
}

const StyledUserNav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
`;

const NavButton = styled.button`
    height: 60px;
    width: 100px;
    border: 1px solid ${props => props.theme.dark};
    border-radius: 5px;
    margin-right: 10px;
`;