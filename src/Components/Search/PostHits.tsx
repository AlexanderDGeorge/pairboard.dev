import React from 'react';
import Post from '../../Posts/Components/Post';
import { connectHits } from 'react-instantsearch-dom';

function PostHits(props: { hits: object[] }) {
    return (
        <>
            {props.hits?.map((hit: any, i: number) => {
                return <Post key={i} post={hit} />;
            })}
        </>
    );
}

const CustomHits = connectHits(PostHits);

export default CustomHits;
