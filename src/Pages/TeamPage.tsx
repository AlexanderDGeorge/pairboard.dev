import React from 'react';
import styled from 'styled-components';
import TeamsNav from '../Components/Teams/TeamsNav';
import TeamsRouter from '../Components/Teams/TeamsRouter';

export default function TeamPage() {
    return (
        <StyledTeamPage>
            <TeamsNav />
            <TeamsRouter />
        </StyledTeamPage>
    )
}

const StyledTeamPage = styled.div`
    height: 100%;
    width: 100%;
    border: 2px solid ${props => props.theme.accent};
    border-radius: 10px;
    background-color: ${props => props.theme.white};
    display: flex;
    overflow-y: scroll;
`;