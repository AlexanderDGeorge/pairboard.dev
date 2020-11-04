import styled from 'styled-components';

export const StyledButton = styled.button`
    margin: 15px 0;
    height: 60px;
    min-width: 120px;
    width: 60%;
    max-width: 600px;
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
        background: ${(props) => props.theme.medium};
        box-shadow: 0 0;
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

export const StyledButtonRow = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const StyledCancelButton = styled.button`
    position: absolute;
    left: 0;
    height: 60px;
    min-width: 100px;
    width: 100px;
    max-width: 100px;
    margin: 15px 0;
    text-decoration: underline;
    transition: border 0.2s linear;
    &:hover {
        transition: border 0.2s linear;
        text-decoration: none;
    }
`;
