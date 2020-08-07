import React, { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../State/UserContext";
import { signOut } from "../firebase/auth";
import DarkModeSelect from "../Components/DarkModeSelect";

export default function UserMenu() {
    const currentUser = useUserContext();
    const [open, setOpen] = useState(false);

    return (
        <UserMenuContainer
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <img src={currentUser?.photoURL} alt="" />
            {open ? <UserMenuDropdown /> : null}
        </UserMenuContainer>
    );
}

function UserMenuDropdown() {
    return (
        <UserMenuDropdownContainer>
            <DarkModeSelect />
            <LogoutButton onClick={signOut}>Logout</LogoutButton>
        </UserMenuDropdownContainer>
    );
}

const UserMenuContainer = styled.div`
    position: relative;
    > img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 2px solid ${(props) => props.theme.white};
    }
`;

const UserMenuDropdownContainer = styled.div`
    width: 200px;
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    left: -110px;
    background-color: ${(props) => props.theme.verylight};
    color: ${(props) => props.theme.verydark};
`;

const LogoutButton = styled.div`
    height: 35px;
    width: 100%;
    margin: 10px 0;
    border-radius: 5px;
    background-color: ${(props) => props.theme.light};
    color: ${(props) => props.theme.dark};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.black};
    }
`;
