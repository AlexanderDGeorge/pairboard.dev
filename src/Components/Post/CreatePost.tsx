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
        <Lane>
            <RedPurpleCard
                onClick={() =>
                    handleModal(<CreatePostModal type="Pairboard" />)
                }
            >
                <h2>Pairboard</h2>
            </RedPurpleCard>
            <PurpleBlueCard
                onClick={() => handleModal(<CreatePostModal type="Group" />)}
            >
                <h2>Group</h2>
            </PurpleBlueCard>
            <BlueGreenCard
                onClick={() => handleModal(<CreatePostModal type="Lecture" />)}
            >
                <h2>Lecture</h2>
            </BlueGreenCard>
        </Lane>
    );
}

const Lane = styled.div`
    width: 100%;
    display: flex;
    overflow-x: scroll;
`;
