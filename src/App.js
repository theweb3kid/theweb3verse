import './App.css';

import { ChakraProvider } from '@chakra-ui/react'
import styled from "styled-components"
import { useToast } from '@chakra-ui/react'
import { ethers } from "ethers";
import { Button } from 'web3-connect-button'

import { useEffect, useState } from 'react';

import Component3D from './components/3DComponent';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: #4824c6;
  font-family: 'Sora', sans-serif;
`

function App() {

  return (
    <ChakraProvider>
      <Container className="App">
        <Header />
        <Component3D />
        <About />
        <Projects />
      </Container>
    </ChakraProvider>
  );
}

export default App;
