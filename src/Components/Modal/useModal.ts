import { useState } from 'react';

export interface ModalSchema {
    handleModal: Function;
    modalOpen: boolean;
    modalContent: JSX.Element | JSX.Element[] | undefined;
}

export default function useModal(open = false) {
    const [modalOpen, setModalOpen] = useState(open);
    const [modalContent, setModalContent] = useState<
        ModalSchema['modalContent']
    >(undefined);

    const handleModal = (content?: JSX.Element | JSX.Element[]) => {
        if (content) {
            setModalOpen(true);
            setModalContent(content);
        } else {
            setModalOpen(false);
            setModalContent(content);
        }
    };

    return { handleModal, modalOpen, modalContent };
}
