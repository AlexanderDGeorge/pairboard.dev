import React from 'react';
import styled from 'styled-components';

export default function PostPage() {
    return (
        <StyledPostPage>
            
        </StyledPostPage>
    )
}

const StyledPostPage = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 100px 10%;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.verylight};
`;