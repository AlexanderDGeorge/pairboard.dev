import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { StyledField } from '../../styled-components/StyledField';

export default function CustomDatePicker(props: {selected: Date, onChange: Function}) {
    return (
        <StyledField>
            <label htmlFor="date">date</label>
            <DatePicker
                selected={props.selected}
                onChange={() => props.onChange()}
            />
        </StyledField>
    )
}
