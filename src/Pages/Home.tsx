import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "../Search/SearchResult";
import { firestore } from "../firebase/firebase";
import Nav from "../Nav/Nav";
import SearchBar from "../Search/SearchBar";

export default () => {
    const [results, setResults] = useState<any>(undefined);

    useEffect(() => {
        (async () => {
            const snapshot = await firestore().collection("searches").get();
            const data = snapshot.docs.map((doc) => doc.data());
            setResults(data);
        })();
    }, []);

    if (results) {
        return (
            <Home>
                <Nav />
                <SearchBar />
                <Results>
                    {results.map((result: any, i: number) => (
                        <SearchResult result={result} key={i} />
                    ))}
                </Results>
            </Home>
        );
    } else {
        return (
            <Home>
                <Nav />
                <SearchBar />
            </Home>
        );
    }
};

const Home = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.white};
`;

const Results = styled.div`
    width: 100%;
    padding: 5%;
    display: flex;
    flex-wrap: wrap;
    *:nth-of-type(odd) {
        margin-right: 10px;
    }
`;
