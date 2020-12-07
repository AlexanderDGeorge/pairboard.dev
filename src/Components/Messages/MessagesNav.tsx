import React from "react";
import { StyledNav } from "../../styled-components/StyledNav";
import NavItem from "../Nav/NavItem";

export default function MessagesNav() {
    return (
        <StyledNav>
            <NavItem path='/messages/new' title='New Message'/>
        </StyledNav>
    );
}
