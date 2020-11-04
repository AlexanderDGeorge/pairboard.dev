import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserSchema } from "../../firebase/schema";

export default function ExternalLinks(props: { user: UserSchema }) {
    return (
        <StyledExternalLinks>
            <GithubLink githubUsername="AlexanderDGeorge" />
        </StyledExternalLinks>
    );
}

const StyledExternalLinks = styled.div`
    width: 100%;
`;

function GithubLink(props: { githubUsername?: string }) {
    const { githubUsername } = props;
    const [data, setData] = useState(undefined);

    useEffect(() => {
        if (!githubUsername) return;
        fetch(`https://api.github.com/users/${githubUsername}`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => console.error(error.message));
    }, [githubUsername]);
    if (data) {
        return (
            <StyledExternalLink href={`https://github.com/${githubUsername}`}>
                github
            </StyledExternalLink>
        );
    } else {
        return null;
    }
}

const StyledExternalLink = styled.a`
    height: 300px;
    width: 500px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 5px;
`;
