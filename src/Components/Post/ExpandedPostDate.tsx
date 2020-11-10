import React from 'react';
import styled from 'styled-components';

export default function ExpandedPostDate(props: { eventStart: Date }) {
    

    return (
        <StyledPostDate>
            
        </StyledPostDate>
    )
}

const StyledPostDate = styled.div`
    height: 100%;
    width: 300px;
    border: 1px solid ${props => props.theme.accent};
    border-radius: 5px;
`;