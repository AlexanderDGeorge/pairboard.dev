import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    height: 100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: ${(props) => props.theme.verydark};
    font-size: 1em;
    outline: none;
    cursor: pointer;
    transition: color 0.2s ease-out;
    &:hover {
        color: ${(props) => props.theme.accent};
        transition: color 0.2s ease-in;
    }
`;

export default StyledLink;
