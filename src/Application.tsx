import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { GlobalStyle } from "./styled-components/globalStyle";
import UserState from "./State/UserState";
import ThemeState from "./State/ThemeState";
import { User } from "./firebase/user";

export const UserContext = createContext<User | undefined | null>(undefined);

export default function Application() {
    const currentUser = UserState();

    return (
        <ApplicationContainer>
            <UserContext.Provider value={currentUser}>
                <ThemeProvider theme={ThemeState(currentUser)}>
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
