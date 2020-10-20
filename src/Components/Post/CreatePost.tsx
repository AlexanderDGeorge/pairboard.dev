import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Application";
import CreatePairboard from "./CreatePairboard";

export default () => {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <CreatePost>
            <h1>Create a Post</h1>
            <Lane>
                <div onClick={() => handleModal(<CreatePairboard />)}>
                    <h2>Pairboard</h2>
                </div>
                <div>
                    <h2>Group</h2>
                </div>
                <div>
                    <h2>Lecture</h2>
                </div>
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
    > div {
        min-height: 200px;
        min-width: 300px;
        margin: 0 10px 10px 0;
        border: 1px solid ${(props) => props.theme.verydark};
        border-radius: 5px;
        padding: 10px 10px 0 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            transition: all linear 0.2s;
            border: 1px solid ${(props) => props.theme.accent};
            box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
        }
    }
`;
