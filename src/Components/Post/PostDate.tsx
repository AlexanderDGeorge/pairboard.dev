import React from 'react';
import styled from 'styled-components';

const MONTHS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
]

const DAYS = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
]

export default function PostDate(props: { start: Date }) {

    function convertDate(start: Date) {
        const temp = new Date(start);
        // console.log(temp);
        const month = MONTHS[temp.getMonth()];
        const day = DAYS[temp.getDay() + 1];
        const date = temp.getDate() + 1;
        return { month, day, date };
    }
    
    const { month, day, date } = convertDate(props.start);

    return (   
        <StyledPostDate>
            <h4>{month}</h4>
            <h2>{date}</h2>
            <h6>{day}</h6>
        </StyledPostDate>
    )
}

const StyledPostDate = styled.div`
    grid-area: date;
    height: 100%;
    min-height: 60px;
    width: 100px;
    border: 1px solid ${props => props.theme.accent};
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    > h2 {
        font-weight: 500;
    }
    > h4 {
        color: ${props => props.theme.orange};
    }
    > h6 {
        font-size: 0.5em;
    }
`;