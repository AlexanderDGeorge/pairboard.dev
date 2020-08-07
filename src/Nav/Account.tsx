import React from "react";
import styled from "styled-components";
import { signOut } from "../firebase/auth";
import { useHistory } from "react-router";
import { useUserContext } from "../State/UserContext";

export default () => {
    const history = useHistory();
    const currentUser = useUserContext();
    return (
        <Account>
            <h4>Account</h4>
            <button
                onClick={() => history.replace(`/user/${currentUser?.uid}`)}
            >
                Go to Profile
            </button>
            <button onClick={signOut}>Logout</button>
        </Account>
    );
};

const Account = styled.div`
    > h4 {
        color: ${(props) => props.theme.verydark};
        margin-bottom: 10px;
    }
    > button {
        height: 35px;
        width: 100%;
        margin: 10px 0;
        border-radius: 5px;
        font-size: 1em;
        background-color: ${(props) => props.theme.light};
        color: ${(props) => props.theme.dark};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            color: ${(props) => props.theme.black};
        }
    }
`;
