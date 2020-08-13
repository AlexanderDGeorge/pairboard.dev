import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";

export default () => {
    return (
        <Login>
            <Header />
        </Login>
    );
};

const Login = styled.div`
    height: 100%;
    width: 100%;
`;
