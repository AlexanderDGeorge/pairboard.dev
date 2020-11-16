import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserSchema } from "../../firebase/schema";
import { useSpring, animated } from "react-spring";
import { signOut } from "../../firebase/auth";
import DropdownItem from './DropdownItem';
import { MdChatBubble, MdExitToApp, MdGroup, MdHome, MdNotifications, MdSettings } from "react-icons/md";

export default function ProfileLink(props: { user: UserSchema }) {
    const { username, photoURL } = props.user;
    const history = useHistory();
    const [menu, setMenu] = useSpring(() => ({
        height: 60,
        width: 60,
        opacity: 1,
    }));

    function handleImgClick() {
        history.push(`/user/${username}`);
    }

    return (
        <StyledProfileLink
            onMouseEnter={() =>
                setMenu({ height: 320, width: 250, opacity: 1 })
            }
            onMouseLeave={() => setMenu({ height: 60, width: 60, opacity: 0 })}
        >
            <img src={photoURL} alt="" onClick={handleImgClick} />
            <animated.div style={menu}>
                <h3 onClick={handleImgClick}>{username}</h3>
                <DropdownItem icon={<MdHome />} path='' name='Home'/>
                <DropdownItem icon={<MdChatBubble />} path='messages' name='Messages'/>
                <DropdownItem icon={<MdGroup />} path='teams' name='Teams'/>
                <DropdownItem icon={<MdNotifications />} path='notifications' name='Notifications'/>
                <DropdownItem icon={<MdSettings />} path='settings' name='Settings'/>
                <button onClick={signOut}><MdExitToApp /> Logout</button>
            </animated.div>
        </StyledProfileLink>
    );
}

const StyledProfileLink = styled.div`
    position: relative;
    height: 60px;
    width: 60px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.dark};
    > img {
        z-index: 2;
        position: absolute;
        height: 100%;
        width: 100%;
        border-top-right-radius: 10px;
        background-color: ${(props) => props.theme.accent};
        cursor: pointer;
    }
    > div {
        z-index: 1;
        overflow: hidden;
        position: absolute;
        top: -1px;
        right: -1px;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: left;
        background-color: ${(props) => props.theme.dark};
        box-shadow: 0 0 20px -5px;
        > * {
            background-color: transparent;
        }
        > h3 {
            height: 60px;
            width: calc(100% - 60px);
            color: ${props => props.theme.white};
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
        > button {
            height: 40px;
            width: 100%;
            border-radius: 10px;
            padding: 5px;
            display: flex;
            align-items: center;
            color: ${props => props.theme.light};
            fill: ${props => props.theme.light};
            text-decoration: none;
            transition: all 0s;
            font-size: 1em;
            &:hover {
                transition: all 0s;
                color: ${props => props.theme.white};
                fill: ${props => props.theme.white};
                background-color: ${props => props.theme.medium};
            }
            > svg {
                height: 100%;
                width: auto;
                margin-right: 10px;
                fill: inherit;
                background: transparent;
            }
        }
    }
`;
