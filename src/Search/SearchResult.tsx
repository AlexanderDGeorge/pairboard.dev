import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "../firebase/search";
import { fetchUserDocument } from "../firebase/user";
import { OrangeTag } from "../Components/Dropdown/Tags";

export default (props: Search) => {
    const [user, setUser] = useState<any>(undefined);

    useEffect(() => {
        (async () => {
            const userDoc = await fetchUserDocument(props.user);
            console.log(userDoc);
            setUser(userDoc);
        })();
    }, [props.user]);

    if (user) {
        return (
            <SearchResult>
                <img src={user.photoURL} alt="" />
                <ResultInfo>
                    <h3>{user.username || user.email}</h3>
                    <p style={{ fontWeight: 600 }}>{props.language}</p>
                    <p>{props.difficulty}</p>
                    <p>{props.score}</p>
                    <OrangeTag>{props.tag}</OrangeTag>
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
    min-width: 300px;
    width: 50%;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 5px;
    display: flex;
    transition: all 0.2s linear;
    cursor: pointer;
    overflow: hidden;
    &:hover {
        transition: all 0.2s linear;
        box-shadow: 0 4px 13px -3px rgba(0, 0, 0, 0.10196);
    }
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
    }
`;

const ResultInfo = styled.div`
    width: 100%;
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > h3 {
        font-size: 1.3em;
        font-weight: 200;
    }
    > p {
        font-weight: 100;
    }
`;
