import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Application";
import useLockBodyScroll from "../../util/useLockBodyScroll";
import useOnOutsideCLick from "../../util/useOnOutsideClick";
import PostForm from "./PostForm";

export default function CreatePostModal(props: {
    type: "Pairboard" | "Group" | "Lecture";
}) {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;
    const [type, setType] = useState<string>(props.type);

    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    function ModalContent() {
        switch (type) {
            case "Pairboard":
                return (
                    <>
                        <p>
                            Pairboards are intended for one on one learning.{" "}
                            <br />
                            Room limits are capped at two occupants.
                        </p>
                        <PostForm />
                    </>
                );
            case "Group":
                return (
                    <>
                        <p>
                            Groups are intended for collaborative teamwork.{" "}
                            <br />
                            Room limits are capped at 20 occupants.
                        </p>
                        <PostForm />
                    </>
                );
            case "Lecture":
                return (
                    <>
                        <p>
                            Lectures are intended for one or a few main
                            speakers. <br />
                            Room limits are capped at 1,000 occupants.
                        </p>
                        <PostForm />
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <StyledModal ref={modalRef}>
            <h1>
                Create a{" "}
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Pairboard">Pairboard</option>
                    <option value="Group">Group</option>
                    <option value="Lecture">Lecture</option>
                </select>{" "}
                Post
            </h1>
            <ModalContent />
        </StyledModal>
    );
}

const StyledModal = styled.div`
    height: 80%;
    width: 80%;
    border-radius: 5px;
    padding: 5%;
    display: flex;
    flex-direction: column;
    cursor: auto;
    overflow-y: scroll;
    > h1 {
        margin-bottom: 10px;
        font-weight: 500;
        > select {
            border: 1px solid ${(props) => props.theme.accent};
            font-size: inherit;
            font-weight: inherit;
        }
        > option {
            font-size: 1em;
        }
    }
    > p {
        font-weight: 100;
        margin-bottom: 20px;
    }
`;
