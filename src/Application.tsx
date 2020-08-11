import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { useThemeContext } from "./State/ThemeContext";
import { GlobalStyle } from "./styled-components/globalStyle";

export default function Application() {
    return (
        <ApplicationContainer>
            <ThemeProvider theme={useThemeContext()}>
                <GlobalStyle />
                <Routing />
            </ThemeProvider>
        </ApplicationContainer>
    );
}

const ApplicationContainer = styled.div`
    height: 100%;
    width: 100%;
`;
