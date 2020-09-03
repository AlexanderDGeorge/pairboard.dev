import React, { useContext } from "react";
import styled from "styled-components";
import StatsBar from "./Components/StatsBar";
import { UserContext } from "../../Application";
import { User } from "../../types/user_types";

export default (props: { user?: User }) => {
    const { streak, score } = props.user || useContext(UserContext)!;

    return (
        <ProfileStats>
            <h1>Stats</h1>
            <StatsBar value={score} max={5} label="Score" />
            <StatsBar value={streak} max={100} label="Pair Streak" />
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
