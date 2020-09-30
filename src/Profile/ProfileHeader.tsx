import React, { useContext } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { UserSchema } from "../firebase/schema";
import { UserContext } from "../Root";

export default (props: { username?: UserSchema["username"] }) => {
    const user = useContext(UserContext)!;
    const score = useSpring({ number: user.score, from: { number: 0 } });

    console.log(user);

    return (
        <ProfileHeader>
            <img src={user.photoURL} alt="" />
            <div>
                <h2>
                    {user.username} |{" "}
                    <animated.span>
                        {score.number.interpolate((number) =>
                            Math.floor(number)
                        )}
                    </animated.span>
                </h2>
                <h3>
                    {user.firstname} {user.lastname}
                </h3>
                <h3>{user.connections.length} connections</h3>
                <h3>connect</h3>
            </div>
        </ProfileHeader>
    );
};

const ProfileHeader = styled.div`
    min-height: 400px;
    width: 100%;
    padding: 5%;
    display: flex;
    flex-wrap: wrap;
    > img {
        height: 200px;
        width: 200px;
        margin: 0 10px 10px 0;
        @media screen and (max-width: 600px) {
            height: 150px;
            width: 150px;
        }
    }
    > div {
        > * {
            margin-bottom: 10px;
        }
        > button {
            font-size: 1.17em;
        }
    }
    * {
        background: transparent;
    }
`;
