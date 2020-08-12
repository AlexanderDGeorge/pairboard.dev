import React, { useState } from "react";
import styled from "styled-components";
// import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

export default () => {
    const subLinks = ["Account", "Edit Profile"];
    const [openLink, setOpenLink] = useState("");
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    function SubLink(props: { label: string }) {
        return (
            <StyledSubLink
                onClick={() => setOpenLink(props.label)}
                style={
                    open && openLink === props.label
                        ? {}
                        : { visibility: "hidden" }
                }
            >
                /{props.label}
            </StyledSubLink>
        );
    }

    return (
        <NestedNav>
            <Link to="/profile/settings" onClick={toggleOpen}>
                Settings
            </Link>
            {subLinks.map((subLink, i) => (
                <SubLink label={subLink} key={i} />
            ))}
        </NestedNav>
    );
};

const NestedNav = styled.div`
    position: relative;
`;

const StyledSubLink = styled.div`
    position: absolute;
`;
