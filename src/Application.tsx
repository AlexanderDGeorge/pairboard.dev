import React, { createContext } from "react";
import { UserSchema } from "./firebase/schema";
import useModal, { ModalSchema } from "./Components/Modal/useModal";
import useUserContext from "./Context/useUserContext";
import useThemeContext from "./Context/useThemeContext";
import { GlobalStyle } from "./styled-components/globalStyle";
import { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import Modal from "./Components/Modal/Modal";

declare global {
    interface Window {
        [key: string]: any;
    }
}

export const UserContext = createContext<UserSchema | undefined | null>(
    undefined
);
export const ModalContext = createContext<ModalSchema | undefined>(undefined);

export default function Application() {
    const currentUser = useUserContext();

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <UserContext.Provider value={currentUser}>
                <ThemeProvider theme={useThemeContext(currentUser)}>
                    <ModalContext.Provider value={useModal()}>
                        <GlobalStyle />
                        <Modal />
                        <Routing />
                    </ModalContext.Provider>
                </ThemeProvider>
            </UserContext.Provider>
        </div>
    );
}
