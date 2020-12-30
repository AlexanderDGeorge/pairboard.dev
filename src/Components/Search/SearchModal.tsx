import React, { useContext, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch } from 'react-instantsearch-dom';
import SearchInput from './SearchInput';
import UserHits from './UserHits';
import PostHits from './PostHits';
import styled from 'styled-components';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import { ModalContext } from '../../Application';
import useLockBodyScroll from '../../util/useLockBodyScroll';

const searchClient = algoliasearch(
    'IQDWF0CVXQ',
    'c47f48c53f21df6fd24f2eb5ab1c7356',
);

export default function Search() {
    const { handleModal } = useContext(ModalContext)!;
    const modalRef = useRef(null);

    useLockBodyScroll();
    useOnOutsideCLick(modalRef, () => handleModal());

    return (
        // <StyledModal ref={modalRef}>
        <InstantSearch searchClient={searchClient} indexName="devs">
            <SearchInput />
            <Index indexName="devs">
                <UserHits />
            </Index>
            <Index indexName="posts">
                <PostHits />
            </Index>
        </InstantSearch>
        // </StyledModal>
    );
}

const StyledModal = styled.div`
    z-index: 2;
    height: 100%;
    width: 100%;
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 10px;
    box-shadow: 0 0 20px ${(props) => props.theme.verydark};
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
`;
