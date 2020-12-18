import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import ProfileCard from '../../Devs/Profile/ProfileCard';

function UserHits(props: { hits: object[] }) {
    return (
        <>
            {props.hits.map((hit: any, i: number) => {
                return <ProfileCard key={i} dev={hit} />;
            })}
        </>
    );
}

const CustomHits = connectHits(UserHits);

export default CustomHits;
