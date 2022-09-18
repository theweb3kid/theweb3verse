import React from 'react'

import Header from "../components/instagram/Header";
import Uploader from "../components/instagram/Uploader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Stories from "../components/instagram/Stories";
import Post from "../components/instagram/Post";
import { ethers } from "ethers";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";
import DecentagramABI from "../components/instagram/assets/Decentragram.json";

const Main = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100vh;
	background: rgba(0, 0, 0, 0.01);
	font-family: "IBM Plex Sans Thai Looped", sans-serif;
`;

const Instagram = ({ account, setAccount }) => {

  const [clicked, setClicked] = useState(false);

  const createSvg = () => {
    let svg = createAvatar(style, {
      seed: "Ojas",
      dataUri: true,
    });
    setSvg(svg);
  };

  const [svg, setSvg] = useState("");

  const contractAddress =
    "0xC4FbE04cD613F9bd36bf866042ddEd00aC6d50bF";
  const ABI = DecentagramABI.output.abi;

  const post = async (
    imgHash,
    postTitle,
    postDescription,
  ) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider =
          new ethers.providers.Web3Provider(
            ethereum,
          );
        const signer = provider.getSigner();
        const decentragramContract =
          new ethers.Contract(
            contractAddress,
            ABI,
            signer,
          );

        let uploadImageFunction =
          await decentragramContract.uploadImage(
            imgHash,
            postTitle,
            postDescription,
          );
        await uploadImageFunction.wait();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider =
          new ethers.providers.Web3Provider(
            ethereum,
          );
        const signer = provider.getSigner();
        const decentragramContract =
          new ethers.Contract(
            contractAddress,
            ABI,
            signer,
          );

        let getUploadedImagesFunction =
          await decentragramContract.getUploadedImages();
        setPosts(getUploadedImagesFunction);
        console.log(getUploadedImagesFunction);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
    createSvg();
  }, [account]);

  return (
    <div>
      <Main>
        <Header
          setClicked={setClicked}
          clicked={clicked}
          account={account}
          setAccount={setAccount}
        />
        {clicked ? (
          <Uploader
            setClicked={setClicked}
            clicked={clicked}
            post={post}
          />
        ) : (
          ""
        )}
        <Stories />
        <Post
          title={"Hello Web3 Degens! This is how your post will look!"}
          img={svg}
          description={
            "Thanks for your support if you want to connect with me I am available at theweb3kid@gmail.com"
          }
          sender={"Ojas"}
        />
        {posts.map((post) => (
          <Post
            key={post[0].toNumber()}
            title={post[2]}
            img={post[1]}
            description={post[3]}
            sender={post[5]}
          />
        ))}
      </Main>
    </div>
  )
}

export default Instagram