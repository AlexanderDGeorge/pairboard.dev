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
    z-index: 3;
    height: 60px;
    box-shadow: 4px 4px 20px -4px ${(props) => props.theme.black};
    background-color: ${(props) => props.theme.verydark};
    cursor: pointer;
    border-radius: 18px;
    > img {
        border-radius: 18px;
        height: 60px;
        width: 60px;
        z-index: 1;
    }
    &:hover {
        box-shadow: 4px 4px 20px -12px ${(props) => props.theme.black};
    }
`;
