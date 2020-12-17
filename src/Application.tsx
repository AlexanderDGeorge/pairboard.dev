import React, { createContext } from 'react';
import { DevSchema } from './Devs/devSchema';
import useCurrentDev from './Devs/util/useCurrentDev';
import useModal, { ModalSchema } from './Components/Modal/useModal';
import { GlobalStyle } from './styled-components/globalStyle';
import Routing from './Routing';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styled-components/theme';

declare global {
    interface Window {
        [key: string]: any;
    }
}

export const CurrentDevContext = createContext<DevSchema | undefined | null>(
    undefined,
);
export const ModalContext = createContext<ModalSchema | undefined>(undefined);

export default function Application() {
    const currentDev = useCurrentDev();

    return (
        <div id="application">
            <CurrentDevContext.Provider value={currentDev}>
                <ThemeProvider theme={lightTheme}>
                    <ModalContext.Provider value={useModal()}>
                        <GlobalStyle />
                        <Routing />
                    </ModalContext.Provider>
                </ThemeProvider>
            </CurrentDevContext.Provider>
        </div>
    );
}
