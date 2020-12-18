import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import useFirebaseQuery from '../../util/useFirebaseQuery';
import LoadingBar from '../../Components/Animated/LoadingBar';
import Post from './Post';
import CreatePostLane from '../CreatePost/CreatePostLane';
import { PostSchema } from '../postSchema';

const restName = {
    width: '40%',
    fontSize: '2em',
    color: 'rgba(0, 0, 0, 1)',
};
const hoverName = {
    width: '80%',
    fontSize: '3em',
    color: 'rgba(0, 0, 0, 0)',
};

export default function PostLane(props: {
    name: string;
    query?: any;
    create?: boolean;
}) {
    const { status, data } = useFirebaseQuery(props.query);

    const [name, setName] = useSpring(() => ({
        width: '40%',
        fontSize: '2em',
        color: 'rgba(0, 0, 0, 1)',
    }));

    function AsyncPostLane() {
        if (status === 'loading') {
            return <LoadingBar />;
        } else if (data?.length) {
            return (
                <>
                    {data.map((post: PostSchema, i: number) => (
                        <Post post={post} key={i} />
                    ))}
                </>
            );
        } else {
            return <h2>no posts</h2>;
        }
    }

    return (
        <StyledPostLane
            onMouseEnter={() => setName(hoverName)}
            onMouseLeave={() => setName(restName)}
        >
            <AnimatedH1 style={name}>{props.name}</AnimatedH1>
            <div>{props.create ? <CreatePostLane /> : <AsyncPostLane />}</div>
        </StyledPostLane>
    );
}

const StyledPostLane = styled.div`
    width: 100%;
    margin: 20px 0;
    > div {
        display: flex;
        overflow-x: auto;
    }
`;

const AnimatedH1 = styled(animated.h1)`
    min-width: 400px;
    margin-bottom: 10px;
    border-bottom: 3px solid ${(props) => props.theme.verydark};
    font-weight: 500;
    background: linear-gradient(30deg, #06d6a0, #009ff5 25%);
    -webkit-background-clip: text;
    background-clip: text;
    cursor: default;
`;
