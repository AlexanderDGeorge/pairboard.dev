import React from "react";
import styled from "styled-components";

export default (props: { label: string; handleClick: Function }) => {
    return (
        <Card onClick={() => props.handleClick()}>
            <h2>{props.label}</h2>
        </Card>
    );
};

const Card = styled.div`
    height: 300px;
    width: 300px;
    margin: 20px 20px 20px 0;
    padding: 20px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.dark};
    &:hover {
        box-shadow: 0 2px 2px 2px ${(props) => props.theme.accent};
    }
`;
