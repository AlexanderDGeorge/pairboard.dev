import React from 'react';
import styled from 'styled-components';

export default function Teams() {
    return (
        <StyledTeams>
            <h1>Teams</h1>
            <p>Coming Soon</p>
        </StyledTeams>
    )
}

const StyledTeams = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
    > h1 {
        margin-bottom: 10px;
        font-weight: 800;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
`;