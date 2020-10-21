import styled from "styled-components";

export const StyledCard = styled.div`
    min-height: 200px;
    min-width: 300px;
    margin: 0 20px 20px 0;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 5px;
    padding: 10px 10px 0 10px;
    box-shadow: 0 0 20px -12px ${(props) => props.theme.verydark};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all linear 0.2s;
    * {
        background: transparent;
    }
    &:hover {
        transition: all linear 0.2s;
        border: 1px solid ${(props) => props.theme.accent};
        border-radius: 5px;
        box-shadow: 0 0 20px -6px ${(props) => props.theme.verydark};
    }
    &:active {
        box-shadow: inset 0 0 20px 2px ${(props) => props.theme.verydark};
    }
`;

export const RedPurpleCard = styled(StyledCard)`
    &:hover {
        border: 0;
        background-image: ${(props) =>
            `linear-gradient(140deg, ${props.theme.purple}, ${props.theme.red})`};
        * {
            color: ${(props) => props.theme.white};
        }
    }
`;

export const PurpleBlueCard = styled(StyledCard)`
    &:hover {
        border: 0;
        background-image: ${(props) =>
            `linear-gradient(50deg, ${props.theme.blue}, ${props.theme.purple})`};
        * {
            color: ${(props) => props.theme.white};
        }
    }
`;

export const BlueGreenCard = styled(StyledCard)`
    &:hover {
        border: 0;

        background-image: ${(props) =>
            `linear-gradient(10deg, ${props.theme.blue}, ${props.theme.green})`};
        * {
            color: ${(props) => props.theme.white};
        }
    }
`;
