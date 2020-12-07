import React, { useContext, useRef } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import UserConnectionsModal from './UserConnectionsModal';
import ConnectionDropdown from './ConnectionDropdown';

export default function ConnectionButton(props: {user: UserSchema}) {
    const buttonRef = useRef(null);
    const { connections } = props.user;
    const { handleModal } = useContext(ModalContext)!;
    const [spring, setSpring] = useSpring(() => ({
        height: 40
    }))

    useOnOutsideCLick(buttonRef, () => setSpring({ height: 40 }))
    
    return (
        <Wrapper>
            <StyledConnectionButton ref={buttonRef} style={spring}>
                <span>

                <ConnectionsButton
                    onClick={() => handleModal(<UserConnectionsModal user={props.user}/>)}
                >
                    {connections.length} connections
                </ConnectionsButton>
                <ConnectionDropdownButton
                    onClick={() => setSpring({ height: 120 })}
                >
                    <MdArrowDropDown />
                </ConnectionDropdownButton>
                </span>
                <ConnectionDropdown user={props.user}/>
            </StyledConnectionButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledConnectionButton = styled(animated.div)`
    height: 40px;
    width: 200px;
    border: 1px solid ${props => props.theme.accent};
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    > span {
        display: flex;
    }
`;

const ConnectionsButton = styled.button`
    height: 40px;
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
    height: 40px;
    width: 30%;
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