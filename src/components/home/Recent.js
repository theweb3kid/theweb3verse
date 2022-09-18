import React from 'react'
import styled from "styled-components"

import nftdaymeetup from "../../assets/nftdaymeetup.png"

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
    width: 560px;
`

const Recent = () => {
    return (
        <Component>
            <Heading>What am I doing these days?</Heading>
            <Text>
                Pleased to share that, on the occasion of International NFT Day which is on 20th Sept, I will be organizing a meetup in Nagpur,
                brought to you by Dapper Labs, Flow Blockchain, and Opensea.
                <br /><br />
                <a href='https://t.co/GfcqEntEIC' target={'_blank'} >Register Here.</a>
            </Text>
            <br />
            <Img src={nftdaymeetup} />
        </Component>
    )
}

export default Recent