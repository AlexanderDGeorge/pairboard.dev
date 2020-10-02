import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Application";
import { StyledField } from "../styled-components/formStyles";
import { MdVerifiedUser } from "react-icons/md";

export default () => {
    const { email, emailVerified } = useContext(UserContext)!;

    return (
        <Settings>
            <h2>Manage Your Settings</h2>
            <AdvancedEmailField>
                <label htmlFor="">change email</label>
                <input type="text" placeholder={email} />
                <MdVerifiedUser />
            </AdvancedEmailField>
            <p>reset password</p>
            <p>verify email</p>
            <p>delete account</p>
            <p>connect github</p>
            <p>notifications</p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </Settings>
    );
};

const Settings = styled.div`
    height: 100%;
    width: 100%;
`;

const AdvancedEmailField = styled(StyledField)`
    position: relative;
    > svg {
        position: absolute;
        top: calc(50% - 10px);
        right: 10px;
        height: 20px;
        width: 20px;
        fill: ${(props) => props.theme.green};
    }
`;
