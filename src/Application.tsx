import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { useThemeContext } from "./State/ThemeContext";
import { GlobalStyle } from "./styled-components/globalStyle";
import { useUserContext } from "./State/UserContext";
import { User } from "./firebase/user";

export const UserContext = createContext<User | undefined | null>(undefined);

export default function Application() {
    const currentUser = useUserContext();

    return (
        <ApplicationContainer>
            <UserContext.Provider value={currentUser}>
                <ThemeProvider theme={useThemeContext(currentUser)}>
                    <GlobalStyle />
                    <Routing />
                </ThemeProvider>
            </UserContext.Provider>
        </ApplicationContainer>
    );
}

const ApplicationContainer = styled.div`
    height: 100%;
    width: 100%;
`;
