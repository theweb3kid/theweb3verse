import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import $ from 'jquery';
import { ethers, Wallet } from "ethers"

import json from "../components/ChatDeployer/chatDeployer.json"

const Main = styled.div`

    background-color: #000;
    color: green;
    font-family: 'Fira Mono', Monospace;
    margin: 0;
    overflow-x: hidden;
    text-align: left;
    min-height: 100vh;

    a {
        color: inherit;
    }
    a:hover {
        color: #FFFFAE;
        background-color: #005F5F;
    }
    .stream {
        margin-top: 8px;
    }
    .line {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        margin: 0 4px;
        padding-top: 2px;
        width: calc(100% - 12px);
    }
    .line p {
        display: inline-block;
        margin: 0;
        padding: 0;
    }
    .line .name {
        max-width: 80px;
        min-width: 80px;
        text-align: right;
        padding-right: 6px;
    }
    .editline {
        background-color: #262626;
        padding: 2px 4px 0px 4px;
        width: calc(100%);
        margin: 0;
        margin-bottom: 8px;
    }
    .editline .edit {
        min-width: calc(100% - 200px);
        outline: none;
    }
    .editline .time {
        user-select: none;
        cursor: default;
    }
    .whitet {
        color: #FFFFAE;
    }
    .redt {
        color: #d75f5f;
    }
    .important {
        color: #E3A786;
    }
    .bluet {
        color: #5f8787;
    }
    .greent {
        color: #afaf00;
    }
    .selft {
        color: #83A598;
    }
    ::selection {
        color: #FFFFAE;
        background: #005F5F;
    }
    ::-webkit-scrollbar {
        background-color: #3A3A3A;
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #bcbcbc;
    }
    ::-webkit-scrollbar-corner {
        background-color: #3A3A3A;
    }
    ::-webkit-resizer {
        background-color: #3A3A3A;
    }
    .phjspenheader:hover {
        background-color: #D44C2A;
    }
  
`

const ChatDeployer = () => {

    const onReady = async () => {

        log("Website", "Starting Server...");

        var wallet = ""
        let deployedChatAddress;
        let deployedChatType;
        let userCount;
        let deployedContractsCount;

        const contractAddress = "0x7f8EaF0B14E1cae3846ccA47580AbCae78DDdcd1";
        const contractABI = json.output.abi;

        const getDeployedChat = async () => {
            try {
                const { ethereum } = window;

                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const chatDeployerChat = new ethers.Contract(contractAddress, contractABI, signer);

                    log("Client", "Fetching Data...");

                    userCount = Number(await chatDeployerChat.userCount());
                    deployedContractsCount = Number(await chatDeployerChat.deployedContractsCount());
                    deployedChatAddress = await chatDeployerChat.deployedChat(wallet);
                    deployedChatType = Number(await chatDeployerChat.deployedChatType(wallet));

                    if (deployedChatType === 0) {
                        deployedChatType = "none"
                    } else if (deployedChatType === 1) {
                        deployedChatType = "public"
                    } else if (deployedChatType === 2) {
                        deployedChatType = "private"
                    } else { }

                    log("Client", "Data Fetched!");

                } else {
                    console.log("Ethereum object doesn't exist!");
                }
            } catch (error) {
                console.log(error);
            }
        }

        const deployPublic = async () => {
            try {
                const { ethereum } = window;

                if (ethereum) {
                    log("Client", "Deploying Public Chat...");
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const chatDeployerContract = new ethers.Contract(contractAddress, contractABI, signer);

                    const deployPublic = await chatDeployerContract.deployPublicChat();
                    const receipt = await deployPublic.wait();

                    if (receipt.status === 1) {
                        console.log("Public Chat Deployed");
                        log("Client", "Public Chat Deployed!");
                    }
                    else {
                        log("Client", "Error! Could Not Deploy!");
                    }

                } else {
                    console.log("Ethereum object doesn't exist!");
                }
            } catch (error) {
                console.log(error);
                log("Client", "Error! Could Not Deploy!");
            }
        }

        const deployPrivate = async () => {
            try {
                const { ethereum } = window;

                if (ethereum) {
                    log("Client", "Deploying Private Chat...");
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const chatDeployerContract = new ethers.Contract(contractAddress, contractABI, signer);

                    const deployPrivate = await chatDeployerContract.deployPrivateChat();
                    const receipt = await deployPrivate.wait();

                    if (receipt.status === 1) {
                        console.log("Private Chat Deployed");
                        log("Client", "Private Chat Deployed!");
                    }
                    else {
                        log("Client", "Error! Could Not Deploy!");
                    }

                } else {
                    console.log("Ethereum object doesn't exist!");
                }
            } catch (error) {
                console.log(error);
                log("Client", "Error! Could Not Deploy!");
            }
        }

        const connectMetamaskWallet = async () => {
            const { ethereum } = window;

            if (ethereum) {

                log("Client", "Connecting Wallet...");

                const accounts = await ethereum.request({
                    method: "eth_requestAccounts"
                });

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log("Connected To: ", account);
                    wallet = account
                    await switchNetwork()
                    await getDeployedChat()
                } else {
                    console.log("Please authorize an account");
                }
            } else {
                log("Client", "Error Connecting Wallet!");
                console.log("Make sure you have MetaMask");
            }
        };

        const checkMetamaskWallet = async () => {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("Make sure you have MetaMask");
                return;
            } else {
                console.log("We have the ethereumn object", ethereum);
            }

            log("Client", "Connecting Wallet...");
            const accounts = await ethereum.request({
                method: "eth_accounts"
            });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account: ", account);
                log("Client", "Found an authorized account: " + account);
                wallet = account
                await switchNetwork()
                await getDeployedChat()
            } else {
                console.log("No authorized account found");
                log("Client", "No authorized account found!");
            }

            const chainId = await ethereum.request({ method: "eth_chainId" });
            console.log("Chain ID: ", chainId);
        };

        const switchNetwork = async () => {
            if (window.ethereum) {
                try {
                    // Try to switch to the Mumbai testnet
                    log("Client", "Switching Network...");
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x13881" }] // Check networks.js for hexadecimal network ids
                    });
                } catch (error) {
                    // This error code means that the chain we want has not been added to MetaMask
                    // In this case we ask the user to add it to their MetaMask
                    if (error.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: "0x13881",
                                        chainName: "Polygon Mumbai Testnet",
                                        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                                        nativeCurrency: {
                                            name: "Mumbai Matic",
                                            symbol: "MATIC",
                                            decimals: 18
                                        },
                                        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                                    }
                                ]
                            });

                            log("Client", "Network Switched To Mumbai!");
                        } catch (error) {
                            console.log(error);
                            log("Client", "Error Switching Network...");
                        }
                    }
                    console.log(error);
                }
            } else {
                // If window.ethereum is not found then MetaMask is not installed
                alert(
                    "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
                );
            }
        };

        var commandlist = [
            ["/help", "Show commands"],
            ["/connect", "Connect Your MetaMask Wallet"],
            ["/about", "Learn About Web3 Chat SDK"],
            ["/about &lt;chat type&gt", "Know About The Types Of Chat Available (about public/private)"],
            ["/deploy &lt;chat type&gt", "Deploy The Chat You Want (deploy public/private)"],
            ["/functions &lt;chat type&gt", "Know What Each Chat Comes With (functions public/private)"],
            ["/clear", "Clear the console"],
        ];
        var previouscommands = [];
        var currentcommand = 0;

        function init() {
            setInterval(time);
            console.log(new Date().getTime());
            log("Website", "A! _____   _   _   _____  _______");
            log("Website", "A!|   __| | |_| | |  _  | |_   _|");
            log("Website", "A!|  |__| |  _  | | ___ |   | |  ");
            log("Website", "A!|_____| |_| |_| |_| |_|   |_|  ");
            log("Website", '[^http://theweb3verse.site/web3-chat-sdk](*Web3 Chat SDK*)');
            if (wallet) {
                log("Website", "Connected To: " + wallet);
                log("Website", "Total User Count: " + userCount);
                log("Website", "Total Chats Deployed: " + deployedContractsCount);
                log("Website", "");
                log("Website", "Address Of Chat Deployed By You: " + deployedChatAddress);
                log("Website", "Type Of Chat Deployed By You: " + deployedChatType);
            } else {
                log("Client", "Not connected to MetaMask");
                log("Client", "To connect say '/connect'");
            }
            log("Website", "");
            log("Client", "For help say '/help'");
            console.log("heloo")
        }

        function log(name, information) {
            var d = new Date();
            var hours = ((d.getHours() < 10) ? "0" : "") + d.getHours();
            var minutes = ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();
            var seconds = ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
            var colour = "white";
            var textcolour = "";
            var postcolour = "";

            switch (name[0]) {
                case "!":
                    postcolour = " important";
                    name = name.substr(1);
                    break;
            }
            switch (name) {
                case "Website":
                    colour = "redt";
                    break;
                case "Server":
                    colour = "bluet";
                    break;
                case "Client":
                    colour = "bluet";
                    break;
                case "User":
                    colour = "greent";
                    postcolour = " selft";
                    break;
            }
            if (information[0] === "A" && information[1] === "!") {
                information = information.substr(2);
                information = information.replace(/ /g, '\u00A0');
            }
            if (information[0] === "E" && information[1] === "!") {
                information = information.substr(2);
                postcolour = " important";
            }

            while (information.indexOf("](") >= 0) { //URL parser

                var NAMEregExp = /\(([^)]+)\)/;
                var uname = NAMEregExp.exec(information)[1];

                var URLregExp = /\[([^)]+)\]/;
                var url = URLregExp.exec(information)[1];
                var newpage = false;
                if (url[0] === "^") {
                    newpage = true;
                    url = url.substr(1);
                }
                var start = information.indexOf("[");
                var end = information.indexOf(")");
                if (newpage) {
                    information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '" target="_blank">' + uname + '</a>');
                } else {
                    information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '">' + uname + '</a>');
                }

            }
            var tobold = true;
            var boldnumber = 0;
            for (var i = 0; i < information.length; i++) {
                if (information[i] === "*" && information[i - 1] !== "*" && information[i + 1] !== "*") {
                    boldnumber++;
                }
            }
            while (information.indexOf("*") >= 0) { //Bold parser
                var pos = information.indexOf("*");
                information = information.replace("*", "");
                if (tobold) {
                    information = information.splice(pos, 0, '<b>');
                } else {
                    information = information.splice(pos, 0, '</b>');
                }
                tobold = !tobold;
                if (tobold && boldnumber <= 1) {
                    break;
                }
            }
            var tounderline = true;
            var underlinenumber = 0;
            for (var i = 0; i < information.length; i++) {
                if (information[i] === "*" && information[i - 1] !== "*" && information[i + 1] !== "*") {
                    underlinenumber++;
                }
            }
            while (information.indexOf("**") >= 0) { //Bold parser
                var pos = information.indexOf("**");
                information = information.replace("**", "");
                if (tounderline) {
                    information = information.splice(pos, 0, '<u>');
                } else {
                    information = information.splice(pos, 0, '</u>');
                }
                tounderline = !tounderline;
                if (tounderline && underlinenumber <= 1) {
                    break;
                }
            } /**/
            $(".stream").append('<div class="line">' +
                '<p class="time">[' + hours + ":" + minutes + ":" + seconds + ']</p>' +
                '<p class="name ' + colour + '">' + name + '</p>' +
                '<p class="information' + postcolour + '">' + information + '</p>' +
                '</div>');
            $(document).scrollTop($(document).height() - $(window).height());
        }
        var timestring = "";
        function time() {
            var d = new Date();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var temptimestring = "[" + hours + ":" + minutes + ":" + seconds + "]";
            if (temptimestring !== timestring) {
                timestring = temptimestring;
                $(".editline .time").text(timestring);
            }
        }

        var ctrldown = false;
        $(".editline .edit").keydown(function (e) {
            var text = $(".editline .edit").text();
            console.log(e.which);
            if (e.which === 13 && text !== "" && !ctrldown) {

                var input = text.split(' ')

                var param = ""
                if (input.length > 1) {
                    param = input[1]
                }

                var command = input[0].split('/')

                if (command.length > 1) {
                    command = command[1]
                } else {
                    command = command[0]
                }

                $(".editline .edit").text("");
                log("User", "/" + command + " " + param);

                cmd(param, command)

                previouscommands[currentcommand] = text;
                currentcommand = previouscommands.length;
                $(".editline .edit").keydown(35);

            }
            if (e.which === 38) { //up
                if (currentcommand > 0) {
                    currentcommand--;
                    $(".editline .edit").text(previouscommands[currentcommand]);
                }
            }
            if (e.which === 40) { //down

                if (currentcommand < previouscommands.length) {
                    currentcommand++;
                    $(".editline .edit").text(previouscommands[currentcommand]);
                }
            }
        });

        async function cmd(param, command) {

            if (command === "help") {
                for (var i = 0; i < commandlist.length; i++) {
                    log("Client", commandlist[i][0] + " : " + commandlist[i][1]);
                }
            } else if (command === "hello") {

                log("Client", "Hello");

            } else if (command === "clear") {

                $(".stream").text("");

            } else if (command === "connect") {

                await connectMetamaskWallet()
                log("Client", "Connected To: '" + wallet + "'.");

            } else if (command === "about") {

                if (param === "") {

                    log("Client", "About Web3 Chat SDK:");
                    log("Client", "This SDK helps you to integrate a decentralized, on-chain chat module into your dapp, which your users can interact with using their web3 wallet on mumbai testnet. It only takes few lines of code and is very easy to integrate. You first need to deploy the chat contract using '/deploy <chat type>' and then use our npm package web3-chat-sdk to add it into your dapp. You can also check the demo of the public chat using '/demo public'");

                } else if (param === "private") {

                    log("Client", "About Private Chat:");

                } else if (param === "public") {

                    log("Client", "About Public Chat:");

                } else {
                    log("Client", "Unrecognised command '" + command + " " + param + "'.");
                }

            } else if (command === "deploy") {

                if (wallet) {
                    if (param === "private") {

                        await deployPrivate()

                    } else if (param === "public") {

                        await deployPublic()

                    } else {
                        log("Client", "Unable To Understand The Chat Type :(");
                    }
                } else {
                    log("Client", "Connect Your Wallet To Deploy Chat! Use /connect");
                }

            } else if (command === "functions") {

                if (wallet) {
                    if (param === "private") {

                        log("Client", "Private Chat Functions");

                    } else if (param === "public") {

                        log("Client", "Public Chat Functions");

                    } else {
                        log("Client", "Unable To Understand The Chat Type :(");
                    }
                } else {
                    log("Client", "Connect Your Wallet To Deploy Chat! Use /connect");
                }

            } else {
                log("Client", "Unrecognised command '" + command + "'.");
            }
        }

        String.prototype.splice = function (idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };

        await checkMetamaskWallet()
        init()

    }


    useEffect(() => {
        const onLoad = async () => {
            onReady()
            console.log("hi")
        };
        window.addEventListener('load', onLoad);
    }, []);

    return (
        <Main>
            <div class="stream"></div>
            <div class="line editline">
                <p class="time"></p>
                <p class="name">&gt;</p>
                <p contenteditable="true" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="information edit"></p>
            </div>
        </Main >
    )
}

export default ChatDeployer