import React from "react";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import { useHistory } from "react-router";

export default function Nav() {
    const history = useHistory();

    return (
        <NavContainer>
            <h2 onClick={() => history.replace("/")}>{"<PairBoard.io/>"}</h2>
            <UserMenu />
        </NavContainer>
    );
}

const NavContainer = styled.div`
    position: relative;
    height: 100px;
    width: 100%;
    padding: 0 5%;
    background-color: ${(props) => props.theme.verydark};
    color: ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    > h2 {
        cursor: pointer;
        &:hover {
            color: ${(props) => props.theme.white};
        }
    }
`;
