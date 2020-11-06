import React from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import styled from 'styled-components';

export default function ExpandedPostOptions() {
    return (
        <StyledPostOptions>
            <MdMenu />
            <MdClose />
        </StyledPostOptions>
    )
}

const StyledPostOptions = styled.div`
    position: absolute;
    width: 50px;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > svg {
        height: 20px;
        width: auto;
    }
`;