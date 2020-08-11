import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUserDocument } from "../firebase/user";
import { OrangeTag } from "./Components/Tags";
import { Search } from "../firebase/search";

export default (props: { result: Search }) => {
    const [user, setUser] = useState<any>(undefined);
    const { language, difficulty, tag } = props.result;

    useEffect(() => {
        (async () => {
            const userDoc = await fetchUserDocument(props.result.user);
            console.log(userDoc);
            setUser(userDoc);
        })();
    }, [props.result.user]);

    if (user) {
        return (
            <SearchResult>
                <img src={user.photoURL} alt="" />
                <ResultInfo>
                    <h4>{user.username || user.email}</h4>
                    <p>
                        {user.experience} | {user.score}
                    </p>
                    <p>{difficulty}</p>
                    <h4>{language}</h4>
                    <OrangeTag>{tag}</OrangeTag>
                </ResultInfo>
            </SearchResult>
        );
    } else {
        return (
            <SearchResult>
                <img src="" alt="" />
            </SearchResult>
        );
    }
};

const SearchResult = styled.div`
    height: 140px;
    min-width: 350px;
    width: calc(50% - 5px);
    margin-bottom: 10px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 5px;
    display: flex;
    transition: box-shadow 0.2s linear;
    cursor: pointer;
    overflow: hidden;
    &:hover {
        transition: box-shadow 0.2s linear;
        box-shadow: 0 4px 15px -8px ${(props) => props.theme.medium};
    }
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
        background-color: ${(props) => props.theme.verydark};
    }
`;

const ResultInfo = styled.div`
    width: 100%;
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > p {
        font-weight: 100;
    }
`;
