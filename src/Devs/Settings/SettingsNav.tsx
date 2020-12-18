import React from 'react';
import NavItem from '../../Components/Nav/NavItem';
import { StyledNav } from '../../styled-components/StyledNav';

export default function SettingsNav() {
    return (
        <StyledNav>
            <NavItem path="/settings/overview" title="Overview" />
            <NavItem path="/settings/profile" title="Profile" />
            <NavItem path="/settings/account" title="Account" />
            <NavItem path="/settings/notifications" title="Notifications" />
            <NavItem path="/settings/teams" title="Teams" />
        </StyledNav>
    );
}
