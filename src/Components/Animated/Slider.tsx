import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

export default function Slider(props: { value: boolean, setValue: Function }) {
    const { value, setValue } = props;
    const initialSpring = value ? {
        left: '41px',
    } : {
            left: '1px',
    };
    const [spring, setSpring] = useSpring(() => initialSpring)
    const [background, setBackground] = useSpring(() => value ? {background: '#06D6A0'} : {background: '#222222'})

    useEffect(() => {
        if (value) {
            setSpring({ left: '41px', })
            setBackground({ background: '#06D6A0'})
        } else {
            setSpring({ left: '1px'})
            setBackground({ background: '#222222'})
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
    border: 1px solid ${props => props.theme.accent};
    cursor: pointer;
    transition: all 0.2s linear;
`;

const StyledToggle = styled(animated.div)`
    position: absolute;
    top: 1px;
    height: 26px;
    width: 26px;
    border: 1px solid ${props => props.theme.accent};
    border-radius: 50%;
`;