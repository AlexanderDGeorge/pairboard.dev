import React from 'react';
import styled from 'styled-components';
import { StyledField } from '../../styled-components/formStyles';

export default function TimeSelect(props: { name: string }) {
    const { name } = props;
    
    return (
        <StyledField>
            <label htmlFor={name}>{name}</label>
            <StyledTimeInput>
                
            </StyledTimeInput>
        </StyledField>
    )
}

const StyledTimeInput = styled.section`
    min-height: 60px;
    height: 60px;
    width: 100%;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    resize: none;
    font-size: 1em;
    outline: none;
    transition: border 0.2s linear;
    &:hover,
    &:focus {
        transition: border 0.2s linear;
        border: 1px solid ${(props) => props.theme.accent};
    }
`;