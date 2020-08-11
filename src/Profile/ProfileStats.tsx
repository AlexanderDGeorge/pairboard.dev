import React, { useContext } from "react";
import styled from "styled-components";
import StatsBar from "./Components/StatsBar";
import { UserContext } from "../Application";

export default () => {
    const currentUser = useContext(UserContext);

    return (
        <ProfileStats>
            <StatsBar value={currentUser?.score} max={5} label="Score" />
            <StatsBar
                value={currentUser?.sessions.length}
                max={100}
                label="Completed PairBoards"
            />
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
`;
