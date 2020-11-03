import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../Application";
import { updateUserProfile } from "../../firebase/user";
import { StyledField } from "../../styled-components/formStyles";
import { StyledButton } from '../../styled-components/StyledButtons';


export default function Edit() {
    const user = useContext(UserContext)!;

    const [blurb, setBlurb] = useState(user.blurb);
    const [githubURL, setGithubURL] = useState(user.githubURL || "");
    const [linkedInURL, setLinkedInURL] = useState(user.linkedInURL || "");
    const [portfolioURL, setPortfolioURL] = useState(user.portfolioURL || "");
    const [username, setUsername] = useState(user.username);
    const [location, setLocation] = useState(user.location || "");
    const [changes, setChanges] = useState(false);

    async function handleSaveChanges() {
        updateUserProfile(
            user.uid,
            blurb,
            githubURL,
            linkedInURL,
            portfolioURL,
            location,
            username
        );
    }

    return (
        <StyledEdit>
            <h2>Edit Your Profile</h2>
            <StyledField>
                <label htmlFor="">blurb</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setChanges(true);
                        setBlurb(e.target.value);
                    }}
                    value={blurb}
                />
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
                <input
                    type="text"
                    onChange={(e) => {
                        setChanges(true);
                        setGithubURL(e.target.value);
                    }}
                    value={githubURL}
                />
            </StyledField>
            <StyledField>
                <label htmlFor="">linkedIn link</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setChanges(true);
                        setLinkedInURL(e.target.value);
                    }}
                    value={linkedInURL}
                />
            </StyledField>
            <StyledField>
                <label htmlFor="">personal link</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setChanges(true);
                        setPortfolioURL(e.target.value);
                    }}
                    value={portfolioURL}
                />
            </StyledField>
            <StyledField>
                <label htmlFor="">username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setChanges(true);
                        setUsername(e.target.value);
                    }}
                    value={username}
                />
            </StyledField>
            <StyledField>
                <label htmlFor="">location</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setChanges(true);
                        setLocation(e.target.value);
                    }}
                    value={location}
                />
            </StyledField>
            <StyledButton disabled={!changes} onClick={handleSaveChanges}>
                Save Changes
            </StyledButton>
        </StyledEdit>
    );
}

const StyledEdit = styled.div`
    height: 100%;
    width: 100%;
`;
