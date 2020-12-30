import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

export default function IOWall() {
    return (
        <StyledIOWall>
            <SmallIOColumn style={{ left: '10%' }} />
            <MediumIOColumn style={{ left: '15%' }} />
            <SmallIOColumn style={{ left: '17%' }} />
            <MediumIOColumn style={{ left: '24%' }} />
            <MediumIOColumn style={{ left: '29%' }} />
            <LargeIOColumn style={{ left: '36%' }} />
            <SmallIOColumn style={{ left: '41%' }} />
            <SmallIOColumn style={{ left: '44%' }} />
            <MediumIOColumn style={{ left: '51%' }} />
            <LargeIOColumn style={{ left: '57%' }} />
            <SmallIOColumn style={{ left: '62%' }} />
            <SmallIOColumn style={{ left: '66%' }} />
            <LargeIOColumn style={{ left: '69%' }} />
            <MediumIOColumn style={{ left: '76%' }} />
            <SmallIOColumn style={{ left: '79%' }} />
            <SmallIOColumn style={{ left: '90%' }} />
        </StyledIOWall>
    );
}

const StyledIOWall = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    overflow: hidden;
`;

const generateIOStream = () => {
    const temp = [];
    for (let i = 0; i < 10000; i++) {
        temp.push(Math.round(Math.random()));
    }
    return temp;
};

function SmallIOColumn(props: { style: React.CSSProperties }) {
    const { style } = props;
    const [io, setIO] = useState<number[]>([]);

    useEffect(() => {
        setIO(generateIOStream());
    }, []);

    return <SmallIOStream style={style}>{io.map((num) => num)}</SmallIOStream>;
}

function MediumIOColumn(props: { style: React.CSSProperties }) {
    const { style } = props;

    const [io, setIO] = useState<number[]>([]);

    useEffect(() => {
        setIO(generateIOStream());
    }, []);

    return (
        <MediumIOStream style={style}>{io.map((num) => num)}</MediumIOStream>
    );
}

function LargeIOColumn(props: { style: React.CSSProperties }) {
    const { style } = props;

    const [io, setIO] = useState<number[]>([]);

    useEffect(() => {
        setIO(generateIOStream());
    }, []);

    return <LargeIOStream style={style}>{io.map((num) => num)}</LargeIOStream>;
}

const falling = keyframes`
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(100%);
    }
`;

const columnStyling = css`
    position: absolute;
    height: 100%;
    width: 0;
    animation: ${falling} 30s infinite;
    animation-timing-function: linear;
    text-align: center;
    text-orientation: upright;
    writing-mode: vertical-lr;
    color: ${(props) => props.theme.green};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SmallIOStream = styled.div`
    ${columnStyling};
    animation-duration: 50s;
    opacity: 0.3;
    font-size: 0.7em;
`;

const MediumIOStream = styled.div`
    ${columnStyling};
    animation-duration: 40s;
    opacity: 0.5;
    font-size: 1em;
`;

const LargeIOStream = styled.div`
    ${columnStyling};
    animation-duration: 30s;
    opacity: 0.7;
    font-size: 1.3em;
`;
