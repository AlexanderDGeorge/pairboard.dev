import React, { useContext } from "react";
import styled from "styled-components";
import StatsBar from "./Components/StatsBar";
import { UserContext } from "../Application";
import { User } from "../firebase/user";

export default (props: { user?: User }) => {
    const currentUser = props.user || useContext(UserContext);

    return (
        <ProfileStats>
            <h1>Stats</h1>
            <StatsBar value={currentUser?.score} max={5} label="Score" />
            <StatsBar
                value={currentUser?.streak}
                max={100}
                label="Pair Streak"
            />
        </ProfileStats>
    );
};

const ProfileStats = styled.div`
    width: 100%;
    padding: 2% 5%;
    > h1 {
        width: 100%;
        padding: 2%;
        border-bottom: 1px solid ${(props) => props.theme.accent};
        margin-bottom: 5%;
        text-align: center;
    }
`;
