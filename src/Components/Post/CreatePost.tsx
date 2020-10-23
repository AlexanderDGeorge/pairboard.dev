import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
    RedPurpleCard,
    PurpleBlueCard,
    BlueGreenCard,
} from "../../styled-components/StyledCard";

export default function CreatePostLane() {
    const history = useHistory();

    return (
        <StyledCreatePostLane>
            <h1>Create a Post</h1>
            <Lane>
                <RedPurpleCard onClick={() => history.replace("/create")}>
                    <h2>Pairboard</h2>
                </RedPurpleCard>
                <PurpleBlueCard onClick={() => history.replace("/create")}>
                    <h2>Group</h2>
                </PurpleBlueCard>
                <BlueGreenCard onClick={() => history.replace("/create")}>
                    <h2>Lecture</h2>
                </BlueGreenCard>
            </Lane>
        </StyledCreatePostLane>
    );
}

const StyledCreatePostLane = styled.div`
    width: 100%;
    > h1 {
        width: 350px;
        margin-bottom: 10px;
        border-bottom: 3px solid ${(props) => props.theme.light};
        font-weight: 500;
    }
`;

const Lane = styled.div`
    width: 100%;
    display: flex;
    overflow-x: scroll;
`;
