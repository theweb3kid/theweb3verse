import React from 'react'
import styled from "styled-components"
import Spline from '@splinetool/react-spline';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding-top: 3rem;
  background-color: #4824c6;
  overflow-x: hidden;
`

const Component3D = () => {

    return (
        <Container>
            <Spline scene="https://prod.spline.design/OAGRtwRwx3HSjzo5/scene.splinecode" />
        </Container>
    )
}

export default Component3D