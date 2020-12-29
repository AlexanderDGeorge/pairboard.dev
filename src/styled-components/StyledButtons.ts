import styled from 'styled-components';

export const StyledButton = styled.button`
    margin: 10px 0;
    height: 60px;
    min-width: 120px;
    /* width: 80%; */
    max-width: 600px;
    border-radius: 18px;
    padding: 10px;
    font-size: 1em;
    font-weight: 600;
    background: ${(props) =>
        `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
    color: ${(props) => props.theme.white};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s ease-out;
    &:hover {
        transition: all 0.5s ease-out;
        color: ${(props) => props.theme.white};
        box-shadow: 0 0 20px -4px ${(props) => props.theme.verydark};
        > svg {
            transition: all 0.5s ease-out;
            fill: ${(props) => props.theme.white};
        }
    }
    &:disabled {
        cursor: not-allowed;
        background: ${(props) => props.theme.medium};
        box-shadow: 0 0;
        color: ${(props) => props.theme.light};
        fill: ${(props) => props.theme.light};
    }
    > svg {
        transition: all 0.5s ease-out;
        background: transparent;
        height: 30px;
        width: auto;
        margin-right: 10px;
        fill: ${(props) => props.theme.light};
    }
    > span {
        margin: 5px 0 0 5px;
        font-weight: 100;
    }
`;

export const StyledButtonRow = styled.div`
    position: relative;
    max-width: 600px;
    margin: 10px;
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
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    margin: 15px 0;
    background-color: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.accent};
    text-decoration: underline;
    transition: border 0.2s linear;
    &:hover {
        transition: border 0.2s linear;
        text-decoration: none;
    }
`;

export const StyledDeleteButton = styled.button`
    position: absolute;
    right: 0;
    height: 60px;
    min-width: 100px;
    width: 100px;
    max-width: 100px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    margin: 15px 0;
    background-color: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.red};
    text-decoration: underline;
    transition: border 0.2s linear;
    &:hover {
        transition: border 0.2s linear;
        text-decoration: none;
    }
`;

export const StyledGithubButton = styled.button`
    min-width: 120px;
    border-radius: 18px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
    font-size: 1em;
    font-weight: 500;
    transition: all 0.5s ease-out;

    &:hover {
        transition: all 0.5s ease-out;
        box-shadow: 0 0 20px -4px ${(props) => props.theme.verydark};
    }
    > svg {
        height: 40px;
        width: auto;
        fill: ${(props) => props.theme.white};
        margin-right: 20px;
    }
`;
