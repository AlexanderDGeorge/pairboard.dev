import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext, CurrentDevContext } from '../../Application';
import { DevPublicProfile } from '../devSchema';
import DevConnectionsModal from './DevConnectionsModal';

export default function ConnectionDropdown(props: { dev: DevPublicProfile }) {
    const { connections } = props.dev;
    const { profile } = useContext(CurrentDevContext)!;
    const { handleModal } = useContext(ModalContext)!;

    function AddRemoveConnection() {
        return (
            <StyledDropdownButton>
                {connections.includes(profile)
                    ? 'Remove Connection'
                    : 'Add Connection'}
            </StyledDropdownButton>
        );
    }

    return (
        <StyledConnectionDropdown>
            <StyledDropdownButton
                onClick={() =>
                    handleModal(<DevConnectionsModal dev={props.dev} />)
                }
            >
                View Connections
            </StyledDropdownButton>
            {profile.uid !== props.dev.uid ? (
                <AddRemoveConnection />
            ) : (
                <StyledDropdownLink to="/settings/profile">
                    Edit Profile
                </StyledDropdownLink>
            )}
        </StyledConnectionDropdown>
    );
}

const StyledConnectionDropdown = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledDropdownLink = styled(Link)`
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.accent};
    padding: 10px;
    background-color: ${(props) => props.theme.white};
    text-decoration: none;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledDropdownButton = styled.button`
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.accent};
    padding: 10px;
    background-color: ${(props) => props.theme.white};
    outline: none;
    font-size: 0.9em;
`;
