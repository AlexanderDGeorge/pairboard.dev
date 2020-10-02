import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Application";
import { StyledField } from "../styled-components/formStyles";

export default () => {
    const {
        blurb,
        githubURL,
        linkedInURL,
        portfolioURL,
        username,
        location,
    } = useContext(UserContext)!;

    return (
        <Edit>
            <h2>Edit Your Profile</h2>
            <StyledField>
                <label htmlFor="">blurb</label>
                <input type="text" placeholder={blurb} />
            </StyledField>
            <StyledField>
                <label htmlFor="">dark mode</label>
                <select name="" id="">
                    <option value="auto">auto</option>
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                </select>
            </StyledField>
            <StyledField>
                <label htmlFor="">github link</label>
                <input type="text" placeholder={githubURL} />
            </StyledField>
            <StyledField>
                <label htmlFor="">linkedIn link</label>
                <input type="text" placeholder={linkedInURL} />
            </StyledField>
            <StyledField>
                <label htmlFor="">personal link</label>
                <input type="text" placeholder={portfolioURL} />
            </StyledField>
            <StyledField>
                <label htmlFor="">username</label>
                <input type="text" placeholder={username} />
            </StyledField>
            <StyledField>
                <label htmlFor="">location</label>
                <input type="text" placeholder={location} />
            </StyledField>
        </Edit>
    );
};

const Edit = styled.div`
    height: 100%;
    width: 100%;
`;
