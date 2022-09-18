import React from 'react'

import styled from "styled-components";
import Header from "../components/twitter/Header";
import Tweets from "../components/twitter/Tweets";
import TweetInput from "../components/twitter/TweetInput";
import ABI from "../components/twitter/DeTwitter.json";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	position: fixed;
	z-index: -1;
	background-color: black;
`;

const Main = styled.div`
	top: 0;
	position: absolute;
	left: 0;
	right: 0;
	height: auto;
`;

const Warn = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	width: 100vw;
	padding: 40vh 20vw;
	color: rgba(29, 161, 242, 0.8);
	font-size: calc(1rem + 0.5vw);
	font-weight: 600;
`;


const Twitter = ({ setAccount, account }) => {

    const contractAddress =
        "0x90157448923dDfc422a6A968A2a8Bead063146bc";

    const contractABI = ABI.output.abi;

    const [gotAllTweets, setGotAllTweets] = useState([]);

    const tweet = async (message) => {
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(
            ethereum,
        );
        const signer = provider.getSigner();

        const deTwitterContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
        );

        let tweeting = await deTwitterContract.tweet(
            message,
        );
        console.log("Mining...", tweeting.hash);
        tweeting.wait();
        console.log("Mined...", tweeting.hash);
    };

    const like = async (id) => {
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(
            ethereum,
        );
        const signer = provider.getSigner();

        const deTwitterContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
        );

        let like = await deTwitterContract.like(id);
        console.log("Mining...", like.hash);
        like.wait();
        console.log("Mined...", like.hash);
    };

    const support = async (id, amount) => {
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(
            ethereum,
        );
        const signer = provider.getSigner();

        const deTwitterContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
        );

        let support = await deTwitterContract.support(
            id,
            amount,
        );
        console.log("Mining...", support.hash);
        support.wait();
        console.log("Mined...", support.hash);
    };

    const getAllTweets = async () => {
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(
            ethereum,
        );
        const signer = provider.getSigner();

        const deTwitterContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
        );

        let allTweets =
            await deTwitterContract.getAllTweets();

        console.log(allTweets);
        setGotAllTweets(allTweets);
    };

    useEffect(() => {
        getAllTweets();
    }, [account]);

    return (
        <div>
            <Background />
            <Header
                setAccount={setAccount}
                account={account}
            />
            <Main>
                {!account ? "" : <TweetInput tweet={tweet} />}
                {!account ? (
                    <Warn>

                        Connect Your Web3 Wallet Using Connect
                        Wallet Button At The Top Right Corner
                        To Read And Tweet On The Decentralized Twitter

                    </Warn>
                ) : (

                    gotAllTweets.map((tweet, id) => {
                        return (
                            <Tweets
                                key={id}
                                tweetData={tweet}
                                like={like}
                                support={support}
                            />
                        );
                    })
                )}
            </Main>
        </div>
    )
}

export default Twitter