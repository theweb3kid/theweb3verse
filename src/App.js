import './App.css';
import '@rainbow-me/rainbowkit/styles.css';

import { ChakraProvider } from '@chakra-ui/react'
import styled from "styled-components"
import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Twitter from './pages/Twitter';
import Instagram from './pages/Instagram';
import Gmail from './pages/Gmail';
import ChatDeployer from './pages/ChatDeployer';
import PayMe from './pages/PayMe';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  font-family: 'Sora', sans-serif;
`

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'TheWeb3Verse',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {

  const [account, setAccount] = useState()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "dtweet",
      element: <Twitter account={account} setAccount={setAccount} />,
    },
    {
      path: "dpost",
      element: <Instagram account={account} setAccount={setAccount} />,
    },
    {
      path: "dmail",
      element: <Gmail account={account} setAccount={setAccount} />,
    },
    {
      path: "web3-chat-sdk",
      element: <ChatDeployer account={account} setAccount={setAccount} />,
    },
    {
      path: "payme",
      element: <PayMe account={account} setAccount={setAccount} />,
    },
  ]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={midnightTheme()} initialChain={chain.polygonMumbai} >
        <ChakraProvider>
          <Container className="App">
            <RouterProvider router={router} />
          </Container>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
