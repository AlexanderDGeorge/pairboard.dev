import React from 'react';
import styled from 'styled-components';
import TeamsNav from '../Components/Teams/TeamsNav';
import TeamsRouter from '../Components/Teams/TeamsRouter';

export default function TeamPage() {
    return (
        <StyledPage>
            <StyledTeamPage>
                <TeamsNav />
                <TeamsRouter />
            </StyledTeamPage>
        </StyledPage>
    );
}

const StyledPage = styled.div`
    min-height: 80%;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 2% 15%;
    background-color: ${(props) => props.theme.verylight};
    @media screen and (max-width: 1000px) {
        padding: 2% 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 2%;
    }
`;

const StyledTeamPage = styled.div`
    height: 100%;
    width: 100%;
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 10px;
    background-color: ${(props) => props.theme.white};
    display: flex;
    overflow-y: auto;
`;
