import React from "react";
import { StyledNav } from "../../styled-components/StyledNav";
import NavItem from "../Nav/NavItem";

export default function TeamsNav() {
    return (
        <StyledNav>
            <NavItem path='/teams/new' title='New Team'/>
        </StyledNav>
    );
}
