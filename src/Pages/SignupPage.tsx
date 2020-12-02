import React, { useState } from "react";
import styled from "styled-components";
import SignupForm from "../Components/Auth/SignupForm";
import ProviderSignup from "../Components/Auth/ProviderSignup";
import { StyledH1 } from "../styled-components/StyledHeaders";
import { StyledHorDiv } from "./LoginPage";
import { MdError } from "react-icons/md";

export default function SignupPage() {
    const [topError, setTopError] = useState<string | undefined>(undefined);

    return (
        <Signup>
            <div>
                <StyledH1>Sign Up</StyledH1>
                {topError ? 
                    <TopError>
                        <MdError />{topError}
                    </TopError> :
                    null
                }
                <ProviderSignup setTopError={setTopError}/>
                <StyledHorDiv>
                    <div></div>
                    <h4>OR</h4>
                    <div></div>
                </StyledHorDiv>
                <SignupForm setTopError={setTopError} />
            </div>
        </Signup>
    );
}

const Signup = styled.div`
    min-height: 80%;
    width: 100%;
    padding: 100px 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.dark};
    > div {
        min-width: 300px;
        width: 60%;
        max-width: 500px;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${props => props.theme.white};
        box-shadow: 0 5px 20px -4px ${props => props.theme.black};
    }
`;

const TopError = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.red};
    > svg {
        height: 100%;
        width: auto;
        margin-right: 10px;
        background: transparent;
        fill: ${(props) => props.theme.red};
    }
`;
