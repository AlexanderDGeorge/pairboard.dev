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

export default function PostDate(props: { sessionDate: Date }) {

    function convertDate(sessionDate: Date) {
        const temp = new Date(sessionDate);
        const month = MONTHS[temp.getMonth()];
        const day = DAYS[temp.getDay()];
        const date = temp.getUTCDate();
        return { month, day, date };
    }
    
    const { month, day, date } = convertDate(props.sessionDate);

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
    width: 100%;
    min-width: 60px;
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