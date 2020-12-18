import React from 'react';
import { firestore } from '../../firebase';
import { DevPublicProfile } from '../devSchema';
import PostLane from '../../Posts/Components/PostLane';

export default function Posts(props: { user: DevPublicProfile }) {
    const { username } = props.user;

    return (
        <PostLane
            name={`Posts by ${username}`}
            query={firestore()
                .collection('posts')
                .where('created_by.username', '==', username)}
        />
    );
}
