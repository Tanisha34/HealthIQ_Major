// import logo from './logo.svg';

import organ from "./contracts/organ.json";
import Web3 from "web3";
import { useState, useEffect } from "react";

import { Route,Routes } from 'react-router-dom';

import './App.css';
import DonorSubmitDetails from './Components/Donor_Submit_details';
import RecipientSubmitDetails from './Components/Recipient_Submit_details';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from "./Components/Home";
import Appointment from "./Components/Appointment";
import DonorDetails from "./Components/PatientAccessRecord";
import DoctorSignup from "./Components/DoctorSignup";



function App() {

  // const [state, setState] = useState({
  //   web3: null,
  //   contract: null,
  // });

  // const [data, setData] = useState("nil");

  // useEffect(() => {
  //   const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

  //   async function template() {
  //     const web3 = new Web3(provider);
  //     //console.log(web3);
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = organ.networks[networkId];
  //     console.log(deployedNetwork.address);
  //     // to interact with a smart contract we need 2 things
  //     // 1. ABI
  //     // 2. contract address

  //     const contract = new web3.eth.Contract(
  //       organ.abi,
  //       deployedNetwork.address
  //       );

  //     const contract = new web3.eth.Contract(organ.abi, deployedNetwork.address)
  // .then((instance) => {
  //   // Contract instance created successfully
  //   console.log('Contract instance:', instance);
  // })
  // .catch((error) => {
  //   // Error occurred while creating contract instance
  //   console.error('Error creating contract instance:', error);
  // });

  //   console.log(contract);// instance of our contract and we will interact with this
  //   setState({ web3: web3, contract: contract });
  //   // console.log("Contract Getter: ", contract.methods.getter().call())
  //   // console.log("Contract Doner: ", contract.methods.view_donor_details())

  //   }
  //   //console.log(state);
    
    
  //   provider && template();
  //   connect();
  // }, []);

  // useEffect(() => {
  //   const { contract } = state;
  //   async function readData() {
  //     const data = await contract.methods.view_donor_details().call();
  //     setData(data);
  //     console.log(data);
  //   }
  //   contract && readData();
  // }, [state]);


  return (
    // <div className="App">
    //   <p>Contract Data : {data}</p>
    // </div>

    <Routes>
      <Route path="/donorsubmitdetails" element={<DonorSubmitDetails />} />
      <Route path="/recipientsubmitdetails" element={<RecipientSubmitDetails/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Register/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/appointment" element={<Appointment/>} />
      <Route path="/donorDetails" element={<DonorDetails/>} />
      <Route path="/doctorsignup" element={<DoctorSignup/>} />


      
    </Routes>
  );
}

export default App;
