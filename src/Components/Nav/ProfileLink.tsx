import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserSchema } from "../../firebase/schema";
import { useSpring, animated } from "react-spring";
import { signOut } from "../../firebase/auth";

export default function ProfileLink(props: { user: UserSchema }) {
    const { username, email, photoURL } = props.user;
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
                setMenu({ height: 180, width: 250, opacity: 1 })
            }
            onMouseLeave={() => setMenu({ height: 60, width: 60, opacity: 0 })}
        >
            <img src={photoURL} alt="" onClick={handleImgClick} />
            <animated.div style={menu}>
                <h3 onClick={handleImgClick}>{username}</h3>
                <p>{email}</p>
                <Link to='/'>Home</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={signOut}>Logout</button>
            </animated.div>
        </StyledProfileLink>
    );
}

const StyledProfileLink = styled.div`
    position: relative;
    height: 60px;
    width: 60px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.mid};
    > img {
        z-index: 2;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: ${(props) => props.theme.accent};
        cursor: pointer;
    }
    > div {
        z-index: 1;
        overflow: hidden;
        position: absolute;
        top: -1px;
        right: -1px;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: left;
        background-color: ${(props) => props.theme.white};
        box-shadow: 0 0 20px -5px;
        > * {
            background-color: transparent;
        }
        > h3 {
            height: 30px;
            width: calc(100% - 60px);
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
        > button,
        a {
            height: 25px;
            width: 100%;
            font-size: 0.8em;
            text-decoration: none;
            transition: background-color 0s;
            display: flex;
            align-items: center;
            justify-content: center;
            outline: none;
            cursor: pointer;
            &:hover {
                background-color: ${(props) => props.theme.light};
                transition: background-color 0s;
            }
        }
    }
`;
