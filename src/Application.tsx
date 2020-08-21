import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { GlobalStyle } from "./styled-components/globalStyle";
import useUserState from "./util/useUserState";
import useThemeState from "./util/useThemeState";
import { User } from "./firebase/user";
import useSearchState from "./util/useSearchState";
import { NewSearchObject } from "./firebase/search";

export const UserContext = createContext<User | undefined | null>(undefined);
export const SearchContext = createContext<
    Partial<[NewSearchObject, Function]>
>([]);

export default function Application() {
    const currentUser = useUserState();
    const [searchParams, setSearchParams] = useSearchState();

    return (
        <ApplicationContainer>
            <UserContext.Provider value={currentUser}>
                <SearchContext.Provider value={[searchParams, setSearchParams]}>
                    <ThemeProvider theme={useThemeState(currentUser)}>
                        <GlobalStyle />
                        <Routing />
                    </ThemeProvider>
                </SearchContext.Provider>
            </UserContext.Provider>
        </ApplicationContainer>
    );
}

const ApplicationContainer = styled.div`
    height: 100%;
    width: 100%;
`;
