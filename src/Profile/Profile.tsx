import React, { useContext } from "react";
import styled from "styled-components";
import { UserSchema } from "../firebase/schema";
import Info from "./Info";
import Posts from "./Posts";
import Buttons from "./Buttons";
import { UserContext } from "../Application";

export default (props: { user: UserSchema }) => {
    const user = useContext(UserContext)!;

    if (props.user.uid === user.uid) {
        return (
            <>
                <Info user={user} />
                <Posts user={user} />
            </>
        );
    } else {
        return (
            <>
                <Info user={props.user} />
                <RightColumn>
                    <Buttons user={props.user} />
                    <Posts user={props.user} />
                </RightColumn>
            </>
        );
    }
};

const RightColumn = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
