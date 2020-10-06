import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../Application";
import { StyledField } from "../../styled-components/formStyles";
import { MdVerifiedUser } from "react-icons/md";

export default () => {
    const user = useContext(UserContext)!;
    // [TODO]: need to reauth before touching settings

    const [email, setEmail] = useState(user.email);

    // const [changes, setChanges] = useState(false);

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
                {user.emailVerified ? <MdVerifiedUser /> : null}
            </AdvancedEmailField>
            <p>reset password</p>
            <p>verify email</p>
            <p>delete account</p>
            <p>connect github</p>
            <p>notifications</p>
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
