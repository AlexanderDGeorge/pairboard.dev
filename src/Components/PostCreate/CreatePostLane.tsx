import React, { useContext } from "react";
import { ModalContext } from "../../Application";
import CreatePostModal from "./CreatePostModal";
import { BlueGreenCard } from "../../styled-components/StyledCard";

export default function CreatePostLane() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <>
            <BlueGreenCard
                style={{width: 300}}
                onClick={() =>
                    handleModal(<CreatePostModal type="Pairboard" />)
                }
            >
                <h2>Pairboard</h2>
            </BlueGreenCard>
            <BlueGreenCard
                style={{width: 300}}
                onClick={() => handleModal(<CreatePostModal type="Team" />)}
            >
                <h2>Team</h2>
            </BlueGreenCard>
            <BlueGreenCard
                style={{width: 300}}
                onClick={() => handleModal(<CreatePostModal type="Lecture" />)}
            >
                <h2>Lecture</h2>
            </BlueGreenCard>
        </>
    );
}
