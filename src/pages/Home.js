import React from 'react'

import styled from "styled-components"

import Component3D from '../components/home/3DComponent';
import Header from '../components/home/Header';
import About from '../components/home/About';
import Projects from '../components/home/Projects';
import Youtube from '../components/home/Youtube';
import Recent from '../components/home/Recent';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: #4824c6;
  font-family: 'Sora', sans-serif;
`

const Home = () => {
    return (
        <Container>
            <Header />
            <Component3D />
            <About />
            <Projects />
            <Youtube />
            <Recent />
        </Container>
    )
}

export default Home