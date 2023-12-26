import React from "react";
import "../CSS/DoctorSignup.css";
//import healthif from "../Images/healthif.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import organ from "../contracts/organ.json";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorSignup() {
  const [state, setState] = useState({ web3: null, contract: null });
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState(0);
  const [docid, setDocid] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  
  //For connecting to metamask wallet through account using button
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
      toast.error("Error connecting to Metamask");
    }
  };
  async function Submitted() {
    //doctorSignUp to blockchain
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(
      `Name: ${name}, Contact: ${contact}, Docid: ${docid}, Password: ${password}, Cpassword: ${cpassword}`
    );
    const { contract } = state;
    try {

      // await contract.methods.doctorSignUp(name, contact, docid, password).send({
      //   from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec",
      //   // from:currentAccount,
      //   gas: 3000000,
      // });
      const transaction = contract.methods.doctorSignUp(
        name,
        contact,
        docid,
        password
      );
      const gasEstimate = await transaction.estimateGas({
        from: currentAccount,
      });
      const confirmed = await window.ethereum.send("eth_sendTransaction", [
        {
          to: contract.options.address, // The contract address
          data: transaction.encodeABI(), // Encoded transaction data
          gas: gasEstimate.toString(), // Hex value of the gas limit
          from: currentAccount, // The user's account
        },
      ]);
      if (confirmed) {
        console.log("Transaction confirmed by user.");
        alert("Account Created Successfully");
        navigate("/doctorsignin");
      } else {
        console.log("User canceled the transaction.");
      }
    } catch (error) {
      console.error("Error during transaction:", error);
      console.log("ID already exists");
      alert("ID already exists");
    }
      // console.log("curr",currentAccount);
      // console.log("Submitted to blockchain");
      // alert("Account Created Successfully");
      // navigate("/doctorsignin");
    // } catch (e) {
    //   console.error(e);
    //   console.log("ID already exists");
    //   alert("ID already exists");
    // }
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
  }, []);
  return (
    <>
      <section className="h-100 gradient-form sec">
        <div className="container py-5 h-100 sec">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row formheight g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        {/* <img className="im" src={healthif} alt="logo" /> */}
                      </div>
                      <form>
                        <p>Please setup your Doctor account</p>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="text"
                            id="form2Example111"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Full Name
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="number"
                            id="form2Example22"
                            className="form-control"
                            onChange={(e) => setContact(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Contact Number
                          </label>
                        </div>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="email"
                            id="form2Example112"
                            className="form-control"
                            onChange={(e) => setDocid(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Doctor ID
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example221"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example222"
                            className="form-control"
                            onChange={(e) => setCpassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Confirm Password
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn  bt btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={Submitted}
                          >
                            Sign up
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already Registered?</p>
                          <Link to="/DoctorSignin">
                            <button
                              type="button"
                              className="btn but btn-outline-danger"
                            >
                              Sign in
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Some Facts</h4>
                      <ul className="small txt mb-0">
                        <li>
                          Doctors in India practice a diverse range of medical
                          systems, from allopathy to traditional Ayurveda and
                          homeopathy.
                        </li>
                        <li>
                          India has a low doctor-patient ratio, with
                          approximately one doctor for every 1,457 people.
                        </li>
                        <li>
                          India is a popular destination for medical tourism,
                          offering high-quality and cost-effective treatments.
                        </li>
                        <li>
                          Providing healthcare in rural areas poses challenges
                          due to a concentration of doctors in urban regions.
                        </li>
                        <li>
                          Medical education in India is highly competitive, with
                          renowned medical colleges attracting aspiring doctors.
                          worldwide
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <button onClick={connect}>Connect</button> */}
      <ToastContainer />
    </>
  );
}
