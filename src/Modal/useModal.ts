import { useState } from "react";

export interface ModalInterface {
    handleModal: Function;
    modalOpen: boolean;
    modalContent: JSX.Element | JSX.Element[] | undefined;
    closeOnOutside: boolean;
}

export default () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<
        JSX.Element | JSX.Element[] | undefined
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

    console.log(modalOpen, modalContent);

    return { handleModal, closeOnOutside, modalOpen, modalContent };
};
