import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserSchema } from "../../firebase/schema";

export default function ExternalLinks(props: { user: UserSchema }) {
    return (
        <StyledExternalLinks>
            {/* <ExternalLink githubURL={props.user.githubURL} /> */}
        </StyledExternalLinks>
    );
}

const StyledExternalLinks = styled.div`
    width: 100%;
`;

function ExternalLink(props: { githubURL?: string }) {
    return (
        <StyledExternalLink to="/">
            <img src={props.githubURL} alt="" />
        </StyledExternalLink>
    );
}

const StyledExternalLink = styled(Link)`
    height: 300px;
    width: 500px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 5px;
`;
