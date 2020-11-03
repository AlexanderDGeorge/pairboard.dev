import styled from "styled-components";

export const StyledField = styled.ul`
    position: relative;
    min-height: 60px;
    min-width: 240px;
    width: 100%;
    max-width: 600px;
    margin: 10px 0;
    list-style-position: outside;

    > label {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > input,
    select {
        min-height: 60px;
        height: 100%;
        width: 100%;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 10px;
        resize: none;
        font-size: 1em;
        outline: none;
        transition: border 0.2s linear;
        &:hover,
        &:focus {
            transition: border 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
    > textarea {
        min-height: 100px;
        height: 100%;
        width: 100%;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 20px 10px 10px 10px;
        resize: none;
        font-size: 1em;
        outline: none;
        transition: border 0.2s linear;
        &:hover,
        &:focus {
            transition: border 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
    > p {
        position: absolute;
        font-weight: 500;
        color: ${(props) => props.theme.red};
        bottom: 0;
    }
    > svg {
        position: absolute;
        top: calc(50% - 10px);
        right: 10px;
        height: 20px;
        width: 20px;
    }
    > li {
        margin: 10px 0 0 10px;
        font-weight: 100;
    }
`;

export const StyledButton = styled.button`
    margin-top: 10px;
    height: 60px;
    min-width: 120px;
    width: 100%;
    max-width: 600px;
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

export const StyledLiButtonWrapper = styled.div`
    margin: 10px 0 20px 0;
    > li {
        margin: 10px 0 0 20px;
        font-weight: 100;
        max-width: 500px;
    }
`;
