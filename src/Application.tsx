import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { GlobalStyle } from "./styled-components/globalStyle";
import useUserState from "./util/useUserState";
import useThemeState from "./util/useThemeState";
import { User } from "./firebase/user";
import useModal, { ModalInterface } from "./Modal/useModal";
import Modal from "./Modal/Modal";

export const UserContext = createContext<User | undefined | null>(undefined);
export const ModalContext = createContext<ModalInterface | undefined>(
    undefined
);

export default function Application() {
    const currentUser = useUserState();
    const { handleModal, modalOpen, modalContent } = useModal();

    return (
        <ApplicationContainer>
            <UserContext.Provider value={currentUser}>
                <ThemeProvider theme={useThemeState(currentUser)}>
                    <ModalContext.Provider
                        value={{
                            handleModal,
                            modalOpen,
                            modalContent,
                        }}
                    >
                        <Modal />
                        <GlobalStyle />
                        <Routing />
                    </ModalContext.Provider>
                </ThemeProvider>
            </UserContext.Provider>
        </ApplicationContainer>
    );
}

const ApplicationContainer = styled.div`
    height: 100%;
    width: 100%;
`;
