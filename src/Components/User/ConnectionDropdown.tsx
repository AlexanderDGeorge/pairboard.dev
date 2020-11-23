import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';

export default function ConnectionDropdown(props: {user: UserSchema }) {
    const { connections } = props.user;
    const { uid, username, name, photoURL } = useContext(UserContext)!;

    function AddRemoveConnection() {
        const lightUser = {uid, username, name, photoURL}

        return (
            <StyledDropdownButton>
                {connections.includes(lightUser) ? 
                    'Remove Connection' : 'Add Connection'
                }
            </StyledDropdownButton>
        )
    }

    return (
        <StyledConnectionDropdown>
            <StyledDropdownButton>
                View Connections
            </StyledDropdownButton>
            {username !== props.user.username ? 
                <AddRemoveConnection /> :
                <StyledDropdownLink to='/settings/edit'>
                    Edit Profile
                </StyledDropdownLink>
            }
        </StyledConnectionDropdown>
    )
}

const StyledConnectionDropdown = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledDropdownLink = styled(Link)`
    width: 100%;
    border-top: 1px solid ${props => props.theme.accent};
    padding: 10px;
    background-color: ${props => props.theme.white};
    text-decoration: none;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledDropdownButton = styled.button`
    width: 100%;
    border-top: 1px solid ${props => props.theme.accent};
    padding: 10px;
    background-color: ${props => props.theme.white};
    outline: none;
    font-size: 0.9em;
`;