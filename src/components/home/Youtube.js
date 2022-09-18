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

const Youtube = () => {
    return (
        <Component>
            <Heading>Did someone said content?</Heading>
            <Text>
                Yeah, started making a solidity course, basically covering the learnings of my blockchain journey as theweb3kid.
                Do subscribe to show your support and lemme know how you would want me to make future content.
                My new recording setup is on the way, so you can expect regular content soon.
            </Text>
            <br />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/xrF4f5CDpog" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Component>
    )
}

export default Youtube