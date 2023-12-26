import React from 'react'

import Web3, { net } from "web3";
import { useState, useEffect } from "react";

import organ from "../contracts/organ.json";

import { toast } from "react-toastify";

export default function DonorDetails() {

    const [state, setState] = useState({ web3: null, contract: null });
    const token=process.env.REACT_APP_WEB3_TOKEN;

    const [currentAccount, setCurrentAccount] = useState("");

    const [donorList, setDonorList] = useState([]);

    const connect = async () => {
        try {
          const { web3 } = state;
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setCurrentAccount(accounts[0]);
          console.log("Connected metamask", accounts[0]);
          toast.success("Connected to Metamask");
        } catch (e) {
            toast.error("Error connecting to Metamask");
            console.log(e);
        }
    };

    let donors = [];
    const makeList = async () => {
        const { contract } = state;
        try 
        {

            let id = 0;
            while(id <= 5)
            {
                let details = contract.methods.view_donor_details(id);
                console.log("details[",id,"]: ", details);
                donors[id] = details;
                id++;
            }

        }
        catch(e)
        {
            toast.error("List End");
            console.log(e);
        }
        finally
        {
            if(donors.length !== 0)
                setDonorList(donors)
        }
    }


    useEffect(() => {
        const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
        async function template() {
          const web3 = new Web3(provider);
          // console.log(web3);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = organ.networks[networkId];
          // console.log(deployedNetwork.address);
          const contract = new web3.eth.Contract(
            organ.abi,
            deployedNetwork.address
          );
          // console.log(contract);//instance of contract
          setState({ web3: web3, contract: contract });
        }
        provider && template();
        connect();
        makeList();
      });

    return (
        <div>
            {donorList}
        </div>
    )
}
