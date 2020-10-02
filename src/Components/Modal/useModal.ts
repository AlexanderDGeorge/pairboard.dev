import { useState } from "react";

export interface ModalSchema {
    modalOpen: boolean;
    setModalOpen: Function;
    toggle: Function;
    modalContent: JSX.Element | undefined;
    setModalContent: Function;
}

export default (open = false) => {
    const [modalOpen, setModalOpen] = useState(open);
    const [modalContent, setModalContent] = useState<JSX.Element | undefined>(
        undefined
    );

    const toggle = () => setModalOpen(!modalOpen);

    return { modalOpen, setModalOpen, toggle, modalContent, setModalContent };
};
