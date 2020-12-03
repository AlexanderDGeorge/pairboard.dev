import styled from "styled-components";

export const StyledCard = styled.div`
    min-height: 200px;
    height: 200px;
    max-height: 200px;
    margin: 0 20px 20px 0;
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 15px;
    padding: 10px;
    box-shadow: 2px 2px 20px -12px ${(props) => props.theme.verydark};
    background-color: ${props => props.theme.white};
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
        box-shadow: 2px 4px 20px -4px ${(props) => props.theme.verydark};
    }
    &:active {
        box-shadow: inset 0 0 20px 2px ${(props) => props.theme.verydark};
    }
`;

export const BlueGreenCard = styled(StyledCard)`
    min-width: 300px;
    &:hover {
        border: 0;
        background-image: ${(props) =>
            `linear-gradient(130deg, ${props.theme.green}, ${props.theme.blue})`};
        * {
            color: ${(props) => props.theme.white};
        }
    }
`;
