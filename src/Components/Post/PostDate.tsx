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

export default function PostDate(props: { start: Date }) {

    function convertDate() {
        const temp = new Date(props.start);
        const month = MONTHS[temp.getMonth()];
        const date = temp.getDate();
        let hours = temp.getHours();
        let minutes = temp.getMinutes();
        let meridian;
        if (hours - 12 > 0) {
            hours -= 12;
            meridian = 'PM'
        } else {
            meridian = 'AM'
        }
        return { month, date, hours, minutes, meridian };
    }
    
    const { month, date, hours, minutes, meridian } = convertDate();

    return (   
        <StyledPostDate>
            <h4>{month}</h4>
            <h2>{date}</h2>
            <h5>{hours}:{minutes}{meridian}</h5>
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