import styled from "styled-components";

export const StyledField = styled.ul`
    position: relative;
    min-height: 60px;
    min-width: 240px;
    width: 100%;
    max-width: 600px;
    margin: 15px 0;
    list-style-position: outside;
    > label {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
        background-color: ${(props) => props.theme.white};
    }
    > input,
    select {
        min-height: 60px;
        height: 60px;
        width: 100%;
        border: 2px solid ${(props) => props.theme.verydark};
        padding: 10px;
        resize: none;
        font-size: 1em;
        outline: none;
        transition: border 0.2s linear;
        &:hover,
        &:focus {
            transition: border 0.2s linear;
            border: 2px solid ${(props) => props.theme.accent};
        }
    }
    > textarea {
        min-height: 100px;
        height: 100%;
        width: 100%;
        border: 2px solid ${(props) => props.theme.verydark};
        padding: 20px 10px 10px 10px;
        resize: none;
        font-size: 1em;
        outline: none;
        transition: border 0.2s linear;
        &:hover,
        &:focus {
            transition: border 0.2s linear;
            border: 2px solid ${(props) => props.theme.accent};
        }
    }
    > p {
        position: absolute;
        width: calc(100% - 4px);
        border-bottom: 2px solid ${props => props.theme.red};
        font-weight: 500;
        color: ${(props) => props.theme.red};
        background-color: ${(props) => props.theme.white};
        bottom: -2px;
        left: 2px;
    }
    > svg {
        position: absolute;
        top: calc(50% - 20px);
        right: 10px;
        height: 20px;
        width: 20px;
    }
    > li {
        margin: 10px 0 0 20px;
        font-weight: 100;
        max-width: 500px;
        font-size: 0.9em;
    }
`;
