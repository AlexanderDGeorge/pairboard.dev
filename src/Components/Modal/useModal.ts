import { useState } from "react";

export interface ModalSchema {
    handleModal: Function;
    modalOpen: boolean;
    modalContent: JSX.Element | JSX.Element[] | undefined;
    closeOnOutside: boolean;
}

export default function useModal(open = false) {
    const [modalOpen, setModalOpen] = useState(open);
    const [modalContent, setModalContent] = useState<
        ModalSchema["modalContent"]
    >(undefined);

    let closeOnOutside = true;
    const handleModal = (content?: JSX.Element | JSX.Element[]) => {
        if (content) {
            setModalOpen(true);
            setModalContent(content);
        } else {
            setModalOpen(false);
            setModalContent(content);
        }
    };

    return { handleModal, closeOnOutside, modalOpen, modalContent };
}
