import styled from "styled-components";

export const StyledField = styled.div`
    position: relative;
    height: 60px;
    min-width: 240px;
    width: 100%;
    /* max-width: 480px; */
    margin: 10px 0;
    cursor: pointer;
    > label {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > input,
    select {
        height: 100%;
        width: 100%;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 10px;
        resize: none;
        font-size: 1em;
        outline: none;
        transition: border 0.2s linear;
        &:hover {
            transition: border 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
    > textarea {
        height: 100%;
        width: 100%;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 20px 10px 10px 10px;
        resize: none;
        font-size: 1em;
        outline: none;
        transition: border 0.2s linear;
        &:hover {
            transition: border 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
    > p {
        position: absolute;
        font-weight: 500;
        color: ${(props) => props.theme.orange};
        bottom: 0;
    }
    > svg {
        position: absolute;
        top: calc(50% - 10px);
        right: 10px;
        height: 20px;
        width: 20px;
    }
`;

export const StyledButton = styled.button`
    height: 60px;
    min-width: 120px;
    width: 100%;
    /* max-width: 240px; */
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
`;
