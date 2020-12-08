import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import ProfileNavDropdown from './ProfileNavDropdown';

export default function ProfileNav() {
    const { photoURL } = useContext(UserContext)!;
    const [open, setOpen] = useState(false);

    return (
        <>
            <StyledProfileNav
                src={photoURL}
                alt=''
                onClick={() => setOpen(true)}
            />
            {open ? 
                <ProfileNavDropdown setOpen={setOpen}/> :
                null
            }
        </>
    )
}

const StyledProfileNav = styled.img`
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-left: 10px;
    background-color: ${props => props.theme.verydark};
    cursor: pointer;
`;