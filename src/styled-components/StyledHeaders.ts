import styled from "styled-components";


export const StyledH1 = styled.h1`
    width: 100%;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 3em;
    background: ${(props) =>
        `linear-gradient(140deg, ${props.theme.blue}, 20%, ${props.theme.green})`};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
`;

export const HeavyH1 = styled.h1`
    margin-bottom: 10px;
        font-weight: 800;
        font-size: 3em;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.blue}, 20%, ${props.theme.green})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
`;