import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledField } from '../../styled-components/StyledField';
import { ErrorMessage } from 'formik';

export default function CustomDatePicker(props: {setFieldValue: Function}) {
    const [startDate, setStartDate] = useState(new Date());

    function handleChange(date: Date) {
        setStartDate(date);
        props.setFieldValue("start", date);
    }

    return (
        <StyledDatePicker>
            <label htmlFor="start">start</label>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
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
`;
