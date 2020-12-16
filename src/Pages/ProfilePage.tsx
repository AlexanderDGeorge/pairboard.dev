import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';
import Loading from './LoadingPage';
import LargeUserCard from '../Devs/Profile/LargeUserCard';
import Posts from '../Devs/Profile/Posts';
import { DevPublicProfile, DevSchema } from '../Devs/devSchema';

function UserPage(props: RouteComponentProps) {
    console.log(props);
    const [user, setUser] = useState<DevPublicProfile | undefined | null>(
        undefined,
    );

    // useEffect(() => {
    //     if (props.user || user === null) return;
    //     (async () => {
    //         const userDoc = await fetchUserDocFromUsername(pathname);
    //         if (userDoc) {
    //             setUser(convertDocToUser(userDoc));
    //         } else {
    //             setUser(null);
    //         }
    //     })();
    //     // eslint-disable-next-line
    // }, []);

    if (user) {
        return (
            <StyledUserPage>
                <LargeUserCard user={user} />
                <Posts user={user} />
            </StyledUserPage>
        );
    } else if (user === null) {
        return (
            <StyledUserPage>
                <h1>User Not Found</h1>
            </StyledUserPage>
        );
    } else {
        return <Loading />;
    }
}

const StyledUserPage = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default withRouter(UserPage);
