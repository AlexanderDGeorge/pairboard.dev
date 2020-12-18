import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import Loading from './LoadingPage';
import Posts from '../Devs/Profile/Posts';
import { DevPublicProfile } from '../Devs/devSchema';
import { CurrentDevContext } from '../Application';
import { firestore } from '../firebase';
import ProfileCard from '../Devs/Profile/ProfileCard';

export default function ProfilePage() {
    const params = useParams<{ username: string }>();
    const { profile } = useContext(CurrentDevContext)!;
    const [dev, setDev] = useState<DevPublicProfile | undefined | null>(
        undefined,
    );

    useEffect(() => {
        if (params.username === profile.username) {
            setDev(profile);
        } else {
            (async () => {
                const devsRef = await firestore()
                    .collectionGroup('profile')
                    .where('username', '==', params.username)
                    .get();
                const data = devsRef.docs[0].data();
                if (data) {
                    // @ts-ignore
                    setDev(data);
                } else {
                    setDev(null);
                }
            })();
        }
    }, [params, profile]);

    if (dev) {
        return (
            <StyledProfilePage>
                <ProfileCard dev={dev} />
                <Posts user={dev} />
            </StyledProfilePage>
        );
    } else if (dev === null) {
        return (
            <StyledProfilePage>
                <h1>User Not Found</h1>
            </StyledProfilePage>
        );
    } else {
        return <Loading />;
    }
}

const StyledProfilePage = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
