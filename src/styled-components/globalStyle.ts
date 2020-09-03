import { createGlobalStyle, Theme } from "styled-components";

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
        background-color: ${(props) => props.theme.white};
    }
`;
