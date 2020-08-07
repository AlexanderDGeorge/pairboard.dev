import React, { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../State/UserContext";
import DarkModeSelect from "./DarkModeSelect";
import Score from "./Score";
import Account from "./Account";

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
            <Score />
            <Account />
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
    box-shadow: 0 2px 2px 2px ${(props) => props.theme.accent};
    color: ${(props) => props.theme.verydark};
`;
