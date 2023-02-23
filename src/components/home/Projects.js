import React from 'react'
import styled from "styled-components"

import { Link } from "react-router-dom";

const Component = styled.div`

  width: 100vw;
  padding: 1rem 0;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  font-family: 'Sora', sans-serif;

  .container {
    max-width: 100vw;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 35px;
    margin: 0 auto;
    padding: 40px 0;
    justify-content: center;
    align-items: center;

    .card {
      position: relative;
      width: 300px;
      height: 400px;
      margin: 0 auto;
      background: #000;
      border-radius: 15px;
      box-shadow: 0 15px 60px rgba(0, 0, 0, 0.5);

      .face {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &.face1 {
          box-sizing: border-box;
          padding: 20px;

          h2 {
            margin: 0;
            padding: 0;
          }

          .insta {
            background-color: #fffc00;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .tweet {
            background-color: #00fffc;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .gmail {
            background-color: #fc00ff;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .connect {
            background-color: #0f0fcf;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        &.face2 {
          transition: 0.5s;

          h2 {
            margin: 0;
            padding: 0;
            font-size: 10em;
            color: #fff;
            transition: 0.5s;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 10;
          }
        }
      }
    }

    .card:hover .face.face2 {
      height: 60px;

      h2 {
        font-size: 2em;
      }
    }

    .card:nth-child(1) .face.face2 {
      background-image: linear-gradient(
        40deg,
        #fffc00 0%,
        #fc00ff 45%,
        #00fffc 100%
      );
      border-radius: 15px;
    }

    .card:nth-child(2) .face.face2 {
      background-image: linear-gradient(
        40deg,
        #fc00ff 0%,
        #00fffc 45%,
        #fffc00 100%
      );
      border-radius: 15px;
    }

    .card:nth-child(3) .face.face2 {
      background-image: linear-gradient(
        40deg,
        #00fffc 0%,
        #fc00ff 45%,
        #fffc00 100%
      );
      border-radius: 15px;
    }

    .card:nth-child(4) .face.face2 {
        background-image: linear-gradient(
          40deg,
          #00fffc 0%,
          #fffc00 45%,
          #fc00ff 100%
        );
        border-radius: 15px;
      }
  }
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

    width: 80vw;
    max-width: 800px;
`

const Projects = () => {
  return (
    <Component>
      <Heading>Major Buidls</Heading>
      <Text>
        These are just some of my recent ships that I love to showcase and I am proud of them,
        if you have some crazy idea/feedback to share hit me up on Twitter at <a href='https://twitter.com/ojasrajankar' target={"_blank"} >@ojasrajankar</a>
      </Text>
      <div class="container">
        <div class="card">
          <div class="face face1">
            <div class="content">
              <span class="stars"></span>
              <h2 class="insta">Decentralized Instagram</h2>
              <br />
              <p class="insta">Andrew Tate got banned from Instagram, welp this is because of centralization, that someone can be blocked on social media. Decentralization can avoid this!</p>
              <br />
              <Link to={"/dpost"} ><button class="insta">View Project</button></Link>
            </div>
          </div>
          <div class="face face2">
            <h2>01</h2>
          </div>
        </div>

        <div class="card">
          <div class="face face1">
            <div class="content">
              <span class="stars"></span>
              <h2 class="tweet">Decentralized Twitter</h2>
              <br />
              <p class="tweet">y00t's account was suspended for no reason by Twitter, do you think it would have happened in case of Twitter being a completly decentralized organization?</p>
              <br />
              <Link to={"/dtweet"} ><button class="tweet">View Project</button></Link>
            </div>
          </div>
          <div class="face face2">
            <h2>02</h2>
          </div>
        </div>

        <div class="card">
          <div class="face face1">
            <div class="content">
              <span class="stars"></span>
              <h2 class="gmail">Decentralized Gmail</h2>
              <br />
              <p class="gmail">Imagine a web3 project collecting email ids! A big hit to privacy, therefore using this project you can send emails directly to user's ethereum address.</p>
              <br />
              <Link to={"/dmail"} ><button class="gmail">View Project</button></Link>
            </div>
          </div>
          <div class="face face2">
            <h2>03</h2>
          </div>
        </div>

        <div class="card">
          <div class="face face1">
            <div class="content">
              <span class="stars"></span>
              <h2 class="connect">Web3 Connect Button</h2>
              <br />
              <p class="connect">A button which can connect to Ethereum as well as Solana chains, this is my first step towards building a chain agnostic decentralized application.</p>
              <br />
              <a href='https://www.npmjs.com/package/web3-connect-button' target={"_blank"} ><button class="connect">View Project</button></a>
            </div>
          </div>
          <div class="face face2">
            <h2>04</h2>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default Projects