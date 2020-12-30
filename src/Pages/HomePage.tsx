import React from 'react';
import styled from 'styled-components';
import PostFeed from '../Posts/Components/PostFeed';

export default function HomePage() {
    return (
        <Home>
            <PostFeed />
        </Home>
    );
}

const Home = styled.div`
    min-height: 80%;
    width: 100%;
    padding: 2% 0 2% 15%;
    background-color: ${(props) => props.theme.verylight};
    @media screen and (max-width: 1000px) {
        padding: 2% 0 2% 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 2% 0 2% 2%;
    }
`;
