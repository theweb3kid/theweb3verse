import React from 'react'
import { Heading, Text } from '@chakra-ui/react'

const Intro = () => {
    return (
        <div style={{ position: "absolute", display: "flex", top: 0, left: 0, width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Heading size='4xl' >Welcome To dMail</Heading>
            <Text fontSize='2xl' color={'blue.300'}>Connect Your Wallet To Access Your Mails</Text>
        </div>
    )
}

export default Intro