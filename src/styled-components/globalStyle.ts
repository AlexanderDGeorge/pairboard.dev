import { createGlobalStyle, Theme, keyframes } from 'styled-components';

const breathing = keyframes`
    from {
        box-shadow: 0 0 20px -8px ;
    }
    to {
        box-shadow: 0 0 20px 0px ;
    }
`;

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
    * {
        margin: 0;
        border: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 300;
        color: ${(props) => props.theme.verydark};
        /* fill: ${(props) => props.theme.verydark}; */
        /* background-color: ${(props) => props.theme.white}; */
    }
    /* button {
        &:hover {
            animation: ${breathing} 2s alternate-reverse infinite;
        }
    } */
`;
