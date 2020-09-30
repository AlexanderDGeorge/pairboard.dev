import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserSchema } from "../../firebase/schema";
import { useSpring, animated } from "react-spring";
import { signOut } from "../../firebase/auth";

export default (props: { user: UserSchema }) => {
    const { username, firstname, lastname, photoURL } = props.user;
    const history = useHistory();
    const [menu, setMenu] = useSpring(() => ({
        height: 60,
        width: 60,
    }));

    function handleImgClick() {
        const path = history.location.pathname;
        if (path === "/profile") return;
        history.replace("/profile");
    }

    return (
        <ProfileLink
            onMouseEnter={() => setMenu({ height: 160, width: 250 })}
            onMouseLeave={() => setMenu({ height: 60, width: 60 })}
        >
            <img src={photoURL} alt="" onClick={handleImgClick} />
            <animated.div style={menu}>
                <h4 onClick={handleImgClick}>{username}</h4>
                <h5 onClick={handleImgClick}>
                    {firstname} {lastname}
                </h5>
                <Link to="/profile/edit">Edit Profile</Link>
                <Link to="/profile/settings">Settings</Link>
                <button onClick={signOut}>Logout</button>
            </animated.div>
        </ProfileLink>
    );
};

const ProfileLink = styled.div`
    position: relative;
    height: 60px;
    width: 60px;
    background-color: ${(props) => props.theme.mid};
    > img {
        z-index: 2;
        position: absolute;
        height: 100%;
        width: auto;
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
        > h4,
        h5 {
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
