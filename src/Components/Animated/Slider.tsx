import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

export default function Slider(props: { value: boolean, setValue: Function }) {
    const { value, setValue } = props;
    const initialSpring = value ? {
        left: '42px',
    } : {
            left: '2px',
    };
    const [spring, setSpring] = useSpring(() => initialSpring)
    const [background, setBackground] = useSpring(() => value ? {background: '#06D6A0'} : {background: '#888888'})

    useEffect(() => {
        if (value) {
            setSpring({ left: '42px', })
            setBackground({ background: '#06D6A0'})
        } else {
            setSpring({ left: '2px'})
            setBackground({ background: '#888888'})
        }
        //eslint-disable-next-line
    }, [value])

    return (
        <StyledSlider onClick={() => setValue(!value)} style={background}>
            <StyledToggle  style={spring}/>
        </StyledSlider>
    )
}


const StyledSlider = styled(animated.div)`
    position: relative;
    height: 30px;
    width: 70px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.2s linear;
`;

const StyledToggle = styled(animated.div)`
    position: absolute;
    top: 2px;
    height: 26px;
    width: 26px;
    border-radius: 50%;
`;