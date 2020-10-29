import React, { useState } from "react";
import styled from "styled-components";
import useLocalStorage from "../util/useLocalStorage";
import { StyledField, StyledButton } from "../styled-components/formStyles";

export default function TestPage() {
    const [input, setInput] = useState("");
    const [localStorage, setLocalStorage] = useLocalStorage("input", "");

    return (
        <StyledDiv>
            <h1>current localStorage: {localStorage}</h1>
            <StyledField>
                <label htmlFor="localStorage">localStorage</label>
                <input type="text" onChange={(e) => setInput(e.target.value)} />
            </StyledField>
            <StyledButton onClick={() => setLocalStorage(input)}>
                SET STORAGE
            </StyledButton>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    width: 100%;
`;
