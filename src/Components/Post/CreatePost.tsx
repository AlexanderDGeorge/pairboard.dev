import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Application";
import CreatePostModal from "../PostCreate/CreatePostModal";
import {
    RedPurpleCard,
    PurpleBlueCard,
    BlueGreenCard,
} from "../../styled-components/StyledCard";

export default function CreatePostLane() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <StyledCreatePostLane>
            <h1>Create a Post</h1>
            <Lane>
                <RedPurpleCard
                    onClick={() =>
                        handleModal(<CreatePostModal type="Pairboard" />)
                    }
                >
                    <h2>Pairboard</h2>
                </RedPurpleCard>
                <PurpleBlueCard
                    onClick={() =>
                        handleModal(<CreatePostModal type="Group" />)
                    }
                >
                    <h2>Group</h2>
                </PurpleBlueCard>
                <BlueGreenCard
                    onClick={() =>
                        handleModal(<CreatePostModal type="Lecture" />)
                    }
                >
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
