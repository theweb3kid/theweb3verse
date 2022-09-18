import React from 'react'
import styled from "styled-components"

import { ArrowDownIcon } from '@chakra-ui/icons'

const Component = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 3rem;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 3;

  font-size: 2rem;
  font-weight: 600;
  font-family: 'Sora', sans-serif;
  color: #fae09e;
`

const Header = () => {
    return (
        <Component>
            <span>
                Welcome To TheWeb3Verse
                <br />
                <span style={{ fontWeight: 400, fontSize: "1rem" }}>
                    Scroll To Know More
                </span>
                <ArrowDownIcon />
            </span>
        </Component>
    )
}

export default Header