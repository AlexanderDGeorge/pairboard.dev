import styled from "styled-components";

const Tag = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    height: 30px;
    padding: 10px;
    border-radius: 20px;
    font-weight: 300;
    color: ${(props) => props.theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const OrangeTag = styled(Tag)`
    background-color: ${(props) => props.theme.orange};
`;

export const YellowTag = styled(Tag)`
    background-color: ${(props) => props.theme.yellow};
`;

export const GreenTag = styled(Tag)`
    background-color: ${(props) => props.theme.green};
`;

export const BlueTag = styled(Tag)`
    background-color: ${(props) => props.theme.blue};
`;
