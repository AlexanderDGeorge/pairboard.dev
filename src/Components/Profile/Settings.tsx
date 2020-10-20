import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../Application";
import { StyledButton, StyledField } from "../../styled-components/formStyles";
import { MdError, MdVerifiedUser } from "react-icons/md";
import { auth } from "../../firebase/firebase";

export default () => {
    const user = useContext(UserContext)!;
    // [TODO]: need to reauth before touching settings

    const [email, setEmail] = useState(user.email);

    // const [changes, setChanges] = useState(false);

    console.log(user.email);

    return (
        <Settings>
            <h2>Manage Your Settings</h2>
            <AdvancedEmailField>
                <label htmlFor="">change email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {user.emailVerified ? (
                    <MdVerifiedUser />
                ) : (
                    <MdError style={{ fill: "#DD0000" }} />
                )}
            </AdvancedEmailField>
            <StyledButton
                onClick={() => auth.currentUser?.sendEmailVerification()}
            >
                Verify Email
            </StyledButton>
            <StyledButton
                onClick={() => auth.sendPasswordResetEmail(user.email)}
            >
                Reset Password
            </StyledButton>
        </Settings>
    );
};

const Settings = styled.div`
    height: 100%;
    width: 100%;
    > button {
        margin-bottom: 10px;
    }
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
