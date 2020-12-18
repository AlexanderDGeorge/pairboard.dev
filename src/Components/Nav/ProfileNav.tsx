import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { CurrentDevContext } from '../../Application';
import ProfileNavDropdown from './ProfileNavDropdown';

export default function ProfileNav() {
    const { image_url } = useContext(CurrentDevContext)!.profile;
    const [open, setOpen] = useState(false);

    return (
        <StyledProfileNav>
            <img src={image_url} alt="" onClick={() => setOpen(true)} />
            {open ? <ProfileNavDropdown setOpen={setOpen} /> : null}
        </StyledProfileNav>
    );
}

const StyledProfileNav = styled.div`
    position: relative;
    > img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-left: 10px;
        background-color: ${(props) => props.theme.verydark};
        cursor: pointer;
    }
`;
