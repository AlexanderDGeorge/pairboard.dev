import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Application";
import CreatePair from "./CreatePair";
import {
    StyledCard,
    RedPurpleCard,
    PurpleBlueCard,
    BlueGreenCard,
} from "../../styled-components/StyledCard";

export default () => {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <CreatePost>
            <h1>Create a Post</h1>
            <Lane>
                <RedPurpleCard onClick={() => handleModal(<CreatePair />)}>
                    <h2>Pairboard</h2>
                </RedPurpleCard>
                <PurpleBlueCard>
                    <h2>Group</h2>
                </PurpleBlueCard>
                <BlueGreenCard>
                    <h2>Lecture</h2>
                </BlueGreenCard>
            </Lane>
        </CreatePost>
    );
};

const CreatePost = styled.div`
    width: 100%;
    > h1 {
        width: 350px;
        margin-bottom: 10px;
        border-bottom: 1px solid ${(props) => props.theme.light};
        font-weight: 500;
    }
`;

const Lane = styled.div`
    width: 100%;
    display: flex;
    overflow-x: scroll;
`;
