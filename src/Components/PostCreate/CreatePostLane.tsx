import React, { useContext } from "react";
import { ModalContext } from "../../Application";
import CreatePostModal from "./CreatePostModal";
import {
    RedPurpleCard,
    PurpleBlueCard,
    BlueGreenCard,
} from "../../styled-components/StyledCard";

export default function CreatePostLane() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <>
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
        </>
    );
}
