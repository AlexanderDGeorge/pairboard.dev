import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../Components/Dropdown/Dropdown";

export default () => {
    const [language, setLanguage] = useState(undefined);

    return (
        <Search>
            <Dropdown
                setValue={setLanguage}
                options={["JavaScript", "Ruby", "Python", "C++"]}
            />
        </Search>
    );
};

const Search = styled.div`
    height: 100px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.verylight};
    padding: 0 5%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    align-items: center;
    /* box-shadow: 0 4px 13px -3px rgba(0, 0, 0, 0.10196); */
`;
