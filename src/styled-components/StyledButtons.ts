import styled from 'styled-components';

export const StyledButton = styled.button`
    margin: 15px 0;
    height: 60px;
    min-width: 120px;
    width: 100%;
    max-width: 300px;
    border-radius: 60px;
    padding: 10px;
    font-size: 1em;
    font-weight: 600;
    background: ${(props) =>
        `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
    color: ${(props) => props.theme.verylight};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s ease-out;
    &:hover {
        transition: all 0.5s ease-out;
        color: ${(props) => props.theme.white};
        box-shadow: 0 0 20px -8px ${(props) => props.theme.dark};
        > svg {
            transition: all 0.5s ease-out;
            fill: ${(props) => props.theme.white};
        }
    }
    &:disabled {
        background: ${(props) => props.theme.verydark};
        box-shadow: 0;
        color: ${(props) => props.theme.verylight};
        fill: ${(props) => props.theme.verylight};
    }
    > svg {
        transition: all 0.5s ease-out;
        background: transparent;
        height: 30px;
        width: auto;
        margin-right: 10px;
        fill: ${(props) => props.theme.verylight};
    }
    > span {
        margin: 5px 0 0 5px;
        font-weight: 100;
    }
`;

export const StyledCancelButton = styled.button`
    min-width: 200px;
    width: 200px;
    max-width: 200px;
    border: 1px solid ${props => props.theme.accent};
    margin: 15px 0;
    transition: border 0.2s linear;
    &:hover {
        transition: border 0.2s linear;
        border: 1px solid ${(props) => props.theme.verydark};
    }
`;
