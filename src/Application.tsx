import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styled-components/globalStyle";
import Routing from "./Routing";
import useUserState from "./util/useUserState";
import useSessionState from "./util/useSessionState";
import useThemeState from "./util/useThemeState";
import useModal, { ModalInterface } from "./Modal/useModal";
import Modal from "./Modal/Modal";
import { User } from "./types/user_types";
import { Session } from "./types/session_types";

declare global {
    interface Window {
        [key: string]: any;
    }
}

export const UserContext = createContext<User | undefined | null>(undefined);
export const SessionContext = createContext<Session | undefined>(undefined);
export const ModalContext = createContext<ModalInterface | undefined>(
    undefined
);

export default function Application() {
    const currentUser = useUserState();

    return (
        <ApplicationContainer>
            <ThemeProvider theme={useThemeState(currentUser)}>
                <ModalContext.Provider value={useModal()}>
                    <UserContext.Provider value={currentUser}>
                        <SessionContext.Provider
                            value={useSessionState(currentUser?.sessionId)}
                        >
                            <GlobalStyle />
                            <Modal />
                            <Routing />
                        </SessionContext.Provider>
                    </UserContext.Provider>
                </ModalContext.Provider>
            </ThemeProvider>
        </ApplicationContainer>
    );
}

const ApplicationContainer = styled.div`
    height: 100%;
    width: 100%;
`;
