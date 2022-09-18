import React from 'react'
import styled from "styled-components"

import myimage from "../../assets/myphoto.JPG"

const Component = styled.div`

  width: 100vw;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const Heading = styled.span`
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    color: #fae09e;
`

const Text = styled.span`
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Sora', sans-serif;
    color: #fae09e;
    margin-top: 2rem;

    width: 90vw;
    max-width: 800px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Img = styled.img`
    height: 250px;
    width: 250px;
    border-radius: 50%;
`

const Highlight = styled.span`
    font-weight: 800;
`

const About = () => {
    return (
        <Component>
            <Heading>Who is theweb3kid?</Heading>
            <Text>
                <Img src={myimage} />
                <br /><br />
                <Highlight>Education (Dropout BITS Pilani)</Highlight>
                <br />
                Hey, in real life people know me as Ojas Rajankar but in web3 I am supposed to be found as theweb3kid.
                Currently, I am 19 and a dropout of BITS Pilani. I am planning to start a distant online degree in the
                sector of business administration, where my passion lies.
                <br /><br />
                <Highlight>Dehidden (Full Stack Web3 Developer)</Highlight>
                <br />
                I started working professionally at a young age, where I had nothing to lose and a lot to gain,
                which gave me the freedom of enjoying the learning curve.
                Now by profession, I am a Full Stack Web3 Developer at Dehidden with 6+ months of experience as a web3 full-timer,
                and a carrer total of 1+ year of experience.
                <br /><br />
                <Highlight>Web3Conf (Co-Organizer)</Highlight>
                <br />
                I am also the Co-Organizer for Web3Conf India, which is the biggest chain-agnostic web3 conference in India.
                We had several sponsors such as Alchemy, Filecoin, WalletConnect, dYdX, and more. Similarly, on the community partner's side, we had
                Buildspace, Superteam, Developer DAO, and many other cool communities. We received a total a great response,
                with 800+ people attending the first edition of the conference in Goa on August 22.
                <br /><br />
                <Highlight>HCL Tech (Analyst)</Highlight>
                <br />
                Before getting into web3, I used to work as an Analyst and side web2 developer at HCL Technologies,
                which is among the Fortune 500 and India's 3rd largest IT Company.
                One of my best projects there, which received client appreciation was a dashboard that I made for H&M.
            </Text>
        </Component>
    )
}

export default About