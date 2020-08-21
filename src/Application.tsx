import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { GlobalStyle } from "./styled-components/globalStyle";
import useUserState from "./util/useUserState";
import useThemeState from "./util/useThemeState";
import { User } from "./firebase/user";

export const UserContext = createContext<User | undefined | null>(undefined);

export default function Application() {
    const currentUser = useUserState();

    return (
        <ApplicationContainer>
            <UserContext.Provider value={currentUser}>
                <ThemeProvider theme={useThemeState(currentUser)}>
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
