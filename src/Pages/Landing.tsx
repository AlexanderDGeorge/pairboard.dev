import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import Footer from "../Nav/Footer";
import Login from "../Auth/Login";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <LandingContainer>
            <Header />
            <TopSection>
                <div>
                    <h1>Search</h1>
                    <p>
                        look for a pairboarding partner with an array of
                        different filters
                    </p>
                </div>
                <div>
                    <h1>Pair</h1>
                    <p>
                        work with your partner to solve problems, work on code,
                        and become a better team member
                    </p>
                </div>
                <div>
                    <h1>Connect</h1>
                    <p>
                        leave a peer review for your partner and expand your
                        network
                    </p>
                </div>
            </TopSection>
            <MiddleSection>
                <h1>Become a Better Developer</h1>
                <Login />
                <Link to="/signup">sign up for free</Link>
            </MiddleSection>
            <Footer />
        </LandingContainer>
    );
}

const LandingContainer = styled.div`
    height: 100%;
    width: 100%;
    > section {
        width: 100%;
        padding: 5%;
    }
`;

const TopSection = styled.section`
    height: 35%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
        height: 100%;
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        > h1 {
            text-align: center;
            margin-bottom: 40px;
        }
        > p {
            text-align: center;
            font-size: 1.3em;
            font-weight: 100;
        }
    }
`;

const MiddleSection = styled.section`
    position: relative;
    height: 70%;
    background-image: ${(props) =>
        `linear-gradient(50deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple})`};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    > h1 {
        position: absolute;
        top: 10%;
        color: ${(props) => props.theme.white};
        background-color: transparent;
        font-size: 4em;
        font-weight: 500;
    }
    > a {
        position: absolute;
        left: 55%;
        height: 80px;
        width: 300px;
        font-size: 1.5em;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px -8px ${(props) => props.theme.black};
        transition: all 0.5s linear;
        &:hover {
            transition: all 0.5s linear;
            box-shadow: 0 4px 20px -4px ${(props) => props.theme.black};
        }
    }
`;
