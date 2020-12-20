import React from 'react';
import styled from 'styled-components';

const DAYS = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
];
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
    'DEC',
];

export default function PostDate(props: { start: any; expanded?: any }) {
    function convertDate() {
        const temp = props.start.toDate();
        const year = temp.getFullYear();
        const month = MONTHS[temp.getMonth()];
        const date = temp.getDate();
        const day = DAYS[temp.getDay()];
        let hours = temp.getHours();
        let minutes: string | number = temp.getMinutes();
        let meridian;
        if (hours - 12 > 0) {
            hours -= 12;
            meridian = 'PM';
        } else {
            meridian = 'AM';
        }
        if (minutes === 0) {
            minutes = '00';
        }
        return { year, month, date, day, hours, minutes, meridian };
    }

    const { year, month, date, day, hours, minutes, meridian } = convertDate();

    if (props.expanded) {
        return (
            <StyledExpandedPostDate>
                <h3>{date}</h3>
                <h4>{month}</h4>
                <h3>{year}</h3>
                <h2>{day}</h2>
                <h3>
                    {hours}:{minutes}
                    {meridian}
                </h3>
            </StyledExpandedPostDate>
        );
    } else {
        return (
            <StyledPostDate>
                <h4>{month}</h4>
                <h2>{date}</h2>
                <h5>
                    {hours}:{minutes}
                    {meridian}
                </h5>
            </StyledPostDate>
        );
    }
}

const StyledPostDate = styled.div`
    grid-area: date;
    height: 100%;
    min-height: 60px;
    width: 100px;
    border: 1px solid ${(props) => props.theme.dark};
    border-radius: 5px;
    padding: 5px;
    /* background-color: ${(props) => props.theme.dark}; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    > * {
        /* color: ${(props) => props.theme.verylight}; */
    }
    > h2 {
        font-weight: 500;
    }
    > h4 {
        color: ${(props) => props.theme.orange};
    }
`;

const StyledExpandedPostDate = styled(StyledPostDate)`
    min-height: 100%;
    min-width: 350px;
    width: 50%;
    padding: 10px;
    flex-direction: row;
    > h4 {
        font-weight: 500;
        font-size: 1.3em;
    }
`;
