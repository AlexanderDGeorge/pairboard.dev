import React from "react";
import styled from "styled-components";
import Overview from "../Components/Account/Overview";

export default function AccountPage() {
    return (
        <StyledAccountPage>
            <Overview />
        </StyledAccountPage>
    );
}

const StyledAccountPage = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 10%;
`;
