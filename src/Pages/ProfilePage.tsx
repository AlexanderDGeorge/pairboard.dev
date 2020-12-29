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
            <StyledPage>
                <StyledProfilePage>
                    <ProfileCard dev={dev} />
                    <Posts user={dev} />
                </StyledProfilePage>
            </StyledPage>
        );
    } else if (dev === null) {
        return (
            <StyledPage>
                <StyledProfilePage>
                    <h1>User Not Found</h1>
                </StyledProfilePage>
            </StyledPage>
        );
    } else {
        return <Loading />;
    }
}

const StyledPage = styled.div`
    min-height: 80%;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 2% 15%;
    background-color: ${(props) => props.theme.verylight};
    @media screen and (max-width: 1000px) {
        padding: 2% 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 2%;
    }
`;

const StyledProfilePage = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
