import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import { PublicPostSchema } from '../postSchema';
import FormContainer from './FormContainer';

export default function CreatePostModal(props: {
    type: PublicPostSchema['type'];
}) {
    const modalRef = useRef(null);
    const [type, setType] = useState<string>(props.type);
    useLockBodyScroll();

    function ModalContent() {
        switch (type) {
            case 'Pairboard':
                return (
                    <>
                        <p>Work with a partner!</p>
                        <FormContainer type={type} />
                    </>
                );
            case 'Team':
                return (
                    <>
                        <p>
                            Collaborate with your team! <br />
                        </p>
                        <FormContainer type={type} />
                    </>
                );
            case 'Lecture':
                return (
                    <>
                        <p>Teach and demonstrate concepts!</p>
                        <FormContainer type={type} />
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <StyledModal ref={modalRef}>
            <h1>
                Create a{' '}
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Pairboard">Pairboard</option>
                    <option value="Team">Team</option>
                    <option value="Lecture">Lecture</option>
                </select>{' '}
                Post
            </h1>
            <ModalContent />
        </StyledModal>
    );
}

const StyledModal = styled.div`
    border-radius: 5px;
    padding: 2%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-direction: column;
    cursor: auto;
    overflow-y: auto;
    > h1 {
        margin-bottom: 10px;
        font-weight: 800;
        font-size: 3em;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        > select {
            border: 1px solid ${(props) => props.theme.accent};
            font-size: inherit;
            font-weight: 500;
            color: ${(props) => props.theme.verydark};
            background: transparent;
        }
    }
    > p {
        margin-bottom: 20px;
    }
`;
