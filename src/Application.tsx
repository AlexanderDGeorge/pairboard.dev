import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { GlobalStyle } from "./styled-components/globalStyle";
import UserState from "./State/UserState";
import SearchState, { defaultSearch } from "./State/SearchState";
import ThemeState from "./State/ThemeState";
import { User } from "./firebase/user";
import { Search } from "./firebase/search";

export const UserContext = createContext<User | undefined | null>(undefined);
export const SearchContext = createContext<Search>(defaultSearch);

export default function Application() {
    const currentUser = UserState();
    const currentSearch = SearchState();

    console.log(currentSearch);

    return (
        <ApplicationContainer>
            <UserContext.Provider value={currentUser}>
                <SearchContext.Provider value={currentSearch}>
                    <ThemeProvider theme={ThemeState(currentUser)}>
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
