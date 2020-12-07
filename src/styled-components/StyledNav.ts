import styled from 'styled-components';
import { Link } from 'react-router-dom';
 
export const StyledNav = styled.nav`
    height: 100%;
    width: 200px;
    border-right: 1px solid ${props => props.theme.accent};
    padding: 10px;
`;

export const StyledNavItem = styled(Link)`
    height: 40px;
    width: 100%;
    border-left: 4px solid ${props => props.theme.green};
    border-bottom: 1px solid ${props => props.theme.accent};
    padding: 5px;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s linear;
    &:hover {
        transition: all 0.2s linear;
        border-left: 4px solid ${props => props.theme.green} !important;
        background-color: ${props => props.theme.light};
    }
`;