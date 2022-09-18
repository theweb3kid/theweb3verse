import React from 'react'
import { useEffect, useState } from 'react';
import Intro from '../components/gmail/Intro';
import Dashboard from '../components/gmail/Dashboard';
import RainbowButton from "../components/gmail/Login";
import { ethers } from "ethers";
import dmail from "../components/gmail/dmail.json"
import { Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import styled from 'styled-components';

const Main = styled.div`
  text-align: center;
  position: absolute;
  min-height: 100vh;
  min-width: 100vw;
  top: 0;
  left: 0;
  background-color: #010101;
  color: #f0f0f0;
  font-family: 'Signika', sans-serif;
`

const Gmail = () => {

  const toast = useToast()

  const [account, setAccount] = useState()
  const [sentMails, setSentMails] = useState([])
  const [receivedMails, setReceivedMails] = useState([])
  const contractAddress = "0x57fd19F965989a87e90e58e9bCAe6C265b714060"
  const contractABI = dmail.output.abi

  const getAllSentMails = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dMailContract = new ethers.Contract(contractAddress, contractABI, signer);

        let mailCount = await dMailContract.getSentMailsCount(account);
        let mailBase = []

        if (mailCount > 0) {
          for (let i = 0; i < mailCount; i++) {
            let mail = await dMailContract.getSentMails(account, i);
            mailBase.push(mail)
          }
        }

        setSentMails(mailBase);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }

  }

  const getAllReceivedMails = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dMailContract = new ethers.Contract(contractAddress, contractABI, signer);

        let mailCount = await dMailContract.getReceivedMailsCount(account);
        let mailBase = []

        if (mailCount > 0) {
          for (let i = 0; i < mailCount; i++) {
            let mail = await dMailContract.getReceivedMails(account, i);
            mailBase.push(mail)
          }
        }

        setReceivedMails(mailBase);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getAllSentMails()
    getAllReceivedMails()
  }, [account])

  const sendMail = async (to, subject, matter) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dMailContract = new ethers.Contract(contractAddress, contractABI, signer);

        let sendmail = await dMailContract.sendMail(to, subject, matter);
        const receipt = await sendmail.wait();

        toast({
          title: 'Sending Your Mail, We will notify you once your mail is sent!',
          status: 'info',
          duration: 3000,
          isClosable: true,
        })

        if (receipt.status === 1) {
          console.log("Mail Sent");
          toast({
            title: 'Mail Sent Successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
        else {
          toast({
            title: 'Failed To Send Email',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Failed To Send Email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }

  }


  return (
    <Main>
      <Heading style={{ position: "absolute", top: '2rem', left: "2rem" }} >dMail</Heading>
      <RainbowButton setAccount={setAccount} account={account} />
      {account ? <Dashboard sendMail={sendMail} getReceivedMails={getAllReceivedMails} getSentMails={getAllSentMails} sentMails={sentMails} receivedMails={receivedMails} /> : <Intro />}
    </Main>
  )
}

export default Gmail