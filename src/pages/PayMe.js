import React from 'react'
import styled from 'styled-components'
import RainbowButton from '../components/Login'

const Main = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    background: black;
    font-family: 'Press Start 2P', cursive;

`

const Header = styled.header`

    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;

`

const Heading = styled.span`
    font-size: 2rem;
`

const Highlight = styled.span`
    color: #3182ce;
`

const Box = styled.div`
    
    height: 80vh;
    width: 96vw;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    border: 6px solid #3182ce;
    border-radius: 10px;

`

const Input = styled.input`

    width: 90%;
    height: 2rem;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);

    background: transparent;
    border-bottom: 2px solid #3182ce;
    outline: none;

    padding: 1rem 0.5rem;

`

const Label = styled.span`

    color: rgba(49, 130, 206, 0.8);

`

const PayMe = ({ account, setAccount }) => {
    return (
        <Main>
            <Header>
                <Heading>Pay<Highlight>Me</Highlight></Heading>
                <RainbowButton account={account} setAccount={setAccount} />
            </Header>
            <Box>
                <Heading>Enter The Details</Heading>
                <Label>Address</Label>
                <Input />
                <Label>Amount</Label>
                <Input />
            </Box>
        </Main>
    )
}

export default PayMe