import React from 'react';
import styled from 'styled-components';
import { HeavyH1 } from '../../styled-components/StyledHeadings';

export default function NewTeam() {
    return (
        <StyledNewTeam>
            <HeavyH1>Create a Team</HeavyH1>
            <h1>Coming Soon</h1>
        </StyledNewTeam>
    );
}

const StyledNewTeam = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
`;
