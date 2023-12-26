import React from "react";
import "../CSS/RecipientSubmitdetails.css";
import Web3, { net } from "web3";
import { useState, useEffect } from "react";

import organ from "../contracts/organ.json";
import { Web3Storage, getFilesFromPath } from "web3.storage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function RecipientSubmitdetails() {
    const [state, setState] = useState({ web3: null, contract: null });
    const token=process.env.REACT_APP_WEB3_TOKEN;
    const storage = new Web3Storage({ token });
    const navigate = useNavigate();

    //const [action,setAction] = useState("recipient");

    const [pid, setPid] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState(0);
    const [age, setAge] = useState(0);
    const [organDonated, setorganDonated] = useState("");
    const [date, setDate] = useState("");

    const [bloodGroup, setBloodGroup] = useState("");
    const [location, setlocation] = useState("");
    
    const [file, setFile] = useState(null);
    const [cidhash, setCidhash] = useState("");
    const [currentAccount, setCurrentAccount] = useState("");

    const connect = async () => {
        try {
          const { web3 } = state;
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setCurrentAccount(accounts[0]);
          console.log("Connected metamask", accounts[0]);
          // toast.success("Connected to Metamask");
        } catch (e) {
          console.log(e);
          // toast.error("Error connecting to Metamask");
        }
      };

      async function Submitted() {
        const { contract } = state;
        try {
          const exist = await contract.methods
            .is_recipient_registered(pid)
            .call({ from: currentAccount });
          if (!exist) {
            alert("Patient ID not registered");
            return;
          } else {
            const cid = await storage.put([file]);
            setCidhash(cid);
            console.log(typeof(cid));
            // alert("Patient ID registered");
            console.log(cidhash);

            const transaction = contract.methods.doctorSubmitDetails(
                pid,
                name,
                contact,
                age,
                organDonated,
                date,
                bloodGroup,
                location,
               
                cidhash
              );
               const gasEstimate = await transaction.estimateGas({
                 from: currentAccount,
               });

               const confirmed = await window.ethereum.send("eth_sendTransaction", [
                {
                  to: contract.options.address, // The contract address
                  data: transaction.encodeABI(), // Encoded transaction data
                  gas: gasEstimate.toString(), // Gas limit as a string
                  from: currentAccount, // The user's account
                },
              ]);
              if (confirmed) {
                // Transaction confirmed by user, call the method
                toast.success("Submission Successful");
                const data = await transaction.call({ from: currentAccount });
                console.log(data);
                document.getElementById("name").value = "";
                document.getElementById("contact").value = "";
                document.getElementById("age").value = "";
                document.getElementById("organDonated").value = "";
                document.getElementById("date").value = "";
                document.getElementById("bloodGroup").value = "";
                
                document.getElementById("location").value = "";
                
                
                document.getElementById("file").reset();
              } else {
                console.log("User canceled the transaction.");
              }
           }
         } catch (e) {
           console.error(e);
         }
         console.log("Submitted");
         console.log(
           `Name: ${pid}, Contact: ${contact}, Age: ${age}, organDonated: ${organDonated},Date: ${date},Blood Group: ${bloodGroup},  location: ${location}`
         );
       }
       useEffect(() => {
        // console.log("web3Token = ",token);
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
      }, []);
      return (
        
        <div className = "container">
        <div className= "header">
            <div className='text'> Recipient </div>
            <div className='underline'></div>
        </div>

        <div className='inputs'>
            <div className='input'>
                <img src="" alt="" />
                <input type ="text" placeholder='Name' 
                onChange={(e) => setName(e.target.value)}
                required
                />

            </div>

            <div className='input'>
                <img src="" alt="" />
                <input type ="tel" placeholder='Contact No.'
                onChange={(e) => setContact(e.target.value)}
                required
                />
            </div>

            <div className='input'>
                <img src="" alt="" />
                <input type ="number" placeholder='Age'
                onChange={(e) => setAge(e.target.value)}
                required
                />
            </div>

            <div className='input'>
                <img src="" alt="" />
                <input type ="text" placeholder='organDonated'
                onChange={(e) => setorganDonated(e.target.value)}
                required
                />
            </div>

            <div className='input'>
                <img src="" alt="" />
                <input type ="date" placeholder='Date' 
                onChange={(e) => setDate(e.target.value)}
                required
                />
            </div>

            { /* <div className='input'>
            <select name="gender">
      <option value="">-- Select Gender --</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select><br />
    </div> */ }

    


            <div className='input'>
                <img src="" alt="" />
                <input type ="text" placeholder='Blood group'
                onChange={(e) => setBloodGroup(e.target.value)}
                required
                />
            </div>

            <div className='input'>
                <img src="" alt="" />
                <input type ="text" placeholder='Location'
                onChange={(e) => setlocation(e.target.value)}
                required
                />
            </div>

            <div className="input">
            {/* <label htmlFor="reports">Upload Reports</label> */}
            <input
              type="file"
              className="input"
              id="report"
              //onChange={(e) => setFile(e.target.files[0])}
              onChange={(e) => setFile(e.target.files[0])}
              required
             
            />
          </div>

        
      
        
        


        </div>
        <button onClick={Submitted} className="submit-container">
            Submit
          </button>

      
            



      
    </div>
  
      );
    }