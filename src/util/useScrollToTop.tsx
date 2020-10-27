import React, { useEffect } from "react";
import styled from "styled-components";

export default function useScrollToTop() {
    useEffect(() => {
        function listenForScroll(e: Event) {
            console.log(e);
        }
        document.addEventListener("scroll", listenForScroll);
        return () => {
            document.removeEventListener("scroll", listenForScroll);
        };
    }, []);

    return { ScrollButton };
}

function ScrollButton() {
    return <StyledScrollButton></StyledScrollButton>;
}

const StyledScrollButton = styled.div`
    z-index: 1;
    position: fixed;
    bottom: 10px;
    right: 10%;
    height: 100px;
    width: 100px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 50%;
`;
