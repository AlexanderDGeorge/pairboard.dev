import React, { useContext } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { ModalContext, UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import UserConnectionsModal from './UserConnectionsModal';

export default function ConnectionButton(props: {user: UserSchema}) {
    const currentUser = useContext(UserContext)!;
    const { connections } = props.user;
    const { handleModal } = useContext(ModalContext)!;
    const [spring, setSpring] = useSpring(() => ({
        height: 40
    }))

    if (currentUser.uid === props.user.uid) {
        return null;
    } else {
        return (
            <StyledConnectionButton style={spring}>
                <ConnectionsButton
                    onClick={() => handleModal(<UserConnectionsModal user={props.user}/>)}
                >
                    {connections.length} connections
                </ConnectionsButton>
                <ConnectionDropdownButton
                    onClick={() => setSpring({ height: 200 })}
                >
                    <MdArrowDropDown />
                </ConnectionDropdownButton>
            </StyledConnectionButton>
        )
    }
}

const StyledConnectionButton = styled(animated.div)`
    height: 40px;
    width: 200px;
    border: 1px solid ${props => props.theme.accent};
    border-radius: 10px;
    overflow: hidden;
    display: flex;
`;

const ConnectionsButton = styled.button`
    height: 100%;
    width: 70%;
    border-right: 1px solid ${props => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.white};
    outline: none;
    transition: all 0s;
    &:hover {
        transition: all 0s;
        background-color: ${props => props.theme.verylight};
    }
`;

const ConnectionDropdownButton = styled.button`
    width: 30%;
    height: 100%;
    background-color: ${props => props.theme.green};
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    > svg {
        height: 20px;
        width: auto;
        fill: ${props => props.theme.white};
    }
`;