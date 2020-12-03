import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledField } from '../../styled-components/StyledField';
import { ErrorMessage } from 'formik';

export default function CustomDatePicker(props: {value: Date, setFieldValue: Function}) {
    return (
        <StyledDatePicker>
            <label htmlFor="start">start</label>
            <DatePicker
                selected={props.value}
                popperPlacement='top'
                onChange={(date: Date) => props.setFieldValue("start", date)}
                showTimeSelect
                shouldCloseOnSelect={false}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeIntervals={15}
                minDate={new Date()}
                name="name"
            />
            <ErrorMessage
                name="start"
                component="p"
            />
        </StyledDatePicker>
    )
}

const StyledDatePicker = styled(StyledField)`
    > div {
        width: 100%;
    }
    * {
        transition: 0s;
    }
`;
