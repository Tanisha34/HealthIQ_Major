import React from "react";
import "../CSS/PatientAccessRecord.css";
import { useLocation } from "react-router-dom";

import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import healthify from "../contracts/organ.json";

export default function PatientAccessRecord() {
  const location = useLocation();
  const [state, setState] = useState({ web3: null, contract: null });
  
  //const [patid, setPatid] = useState(location.state.patid);
  const [name, setName] = useState("");
  const [contact, setContact] = useState(null);
  const [ctr, setCtr] = useState(0);
  const [nrecords, setNrecords] = useState(1);

  let ageArray = [];
  // let weightArray = [];
  // let heightArray = [];
  // let bloodPressureArray = [];
  let organsArray = [];
  //let temperatureArray = [];
  let dateArray = [];
  let donorbloodgroupArray = [];
  let donorlocationArray = [];
  let cidhashArray = [];
  let linkArray = [];

  const [llink, setLlink] = useState("https://");
  const [rlink, setRlink] = useState(".ipfs.w3s.link");
  const [link, setLink] = useState([]);
  const [ind, setInd] = useState(0);
  const [pid, setPid] = useState([]);
  const [age, setAge] = useState([]);

  // const [weight, setWeight] = useState([]);
  // const [height, setHeight] = useState([]);

  const [donorOrgans, setdonorOrgans] = useState([]);
  // const [heartRate, setHeartRate] = useState([]);
  // const [temperature, setTemperature] = useState([]);

  const [date, setDate] = useState([]);
  const [donorBloodgroup, setdonorBloodgroup] = useState([]);
  const [donorlocation, setdonorlocation] = useState([]);

  const [cidhash, setCidhash] = useState([]);
  
  const [currentAccount, setCurrentAccount] = useState("");
  const connect = async () => {
    try {
      const { web3 } = state;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log("Connected metamask", accounts[0]);
      setCtr(ctr + 1);
      // toast.success("Connected to Metamask");
    } catch (e) {
      console.log(e);
      // toast.error("Error connecting to Metamask");
    }
  };
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      // console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = healthify.networks[networkId];
      // console.log(deployedNetwork.address);
      const contract = new web3.eth.Contract(
        healthify.abi,
        deployedNetwork.address
      );
      // console.log(contract);//instance of contract
      setState({ web3: web3, contract: contract });
    }
    provider && template();
    connect();
  }, []);
    useEffect(() => {
        FetchDetails();
    }, [ctr]);

    function getPrevious() {
      if (ind > 0) {
        setInd(ind - 1);
      }
    }
    function getNext() {
      if (ind < nrecords - 1) {
        setInd(ind + 1);
      }
    }
    async function FetchDetails() {
        const { contract } = state;
        // try {
        //     const data = await contract.methods.view_donor_details(patid).call({ from: currentAccount });
        //     console.log("pat details",data);
        //     setName(data[0]);
        //     setContact(data[1].toString());
        //     // alert("Details Fetched");
        // } catch (e) {
        //     console.error(e);
        //     console.log("Inavlid Credentials");
        //     // alert("Fetch Details Failed");
        // }
        try{
          let id = 0;
          const record = await contract.methods
            .view_donor_details(id)
            .call({ from:currentAccount });
          console.log("patient record details", record);
          setNrecords(record.length);
          for (let i = 0; i < record.length; i++) {
            ageArray.push(record[i].age);
            // weightArray.push(record[i].weight);
            // heightArray.push(record[i].height);

            organsArray.push(record[i].organs);
            dateArray.push(record[i].date);
            donorbloodgroupArray.push(record[i].donor_blood_group);
            donorlocationArray.push(record[i].donor_location);

            // bloodPressureArray.push(record[i].bp);
            // heartRateArray.push(record[i].heartrate);
            // temperatureArray.push(record[i].temp);
            
            // prescriptionArray.push(record[i].prescription);
            
            //cidhashArray.push(record[i].report);

            // if (cidhashArray[i] === "") {
            //   linkArray.push("no_report");
            // } else {
            //   linkArray.push(llink + cidhashArray[i] + rlink);
            // }
          }
          setPid(id);
          setdonorOrgans(organsArray);
          setDate(dateArray);
          setdonorBloodgroup(donorbloodgroupArray);
          setdonorlocation(donorlocationArray);

          // setHeartRate(heartRateArray);
          // setTemperature(temperatureArray);
          
          // setPrescription(prescriptionArray);
          // setCidhash(cidhashArray);
          setLink(linkArray);

          // const intWeightArray = weightArray.map((bigint) => Number(bigint));
          // setWeight(intWeightArray);
          // // console.log("wt arr",intWeightArray);

          // const intAgeArray = ageArray.map((bigint) => Number(bigint));
          // setAge(intAgeArray);
          // // console.log("age arr",intAgeArray);

          // const intHeightArray = heightArray.map((bigint) => Number(bigint));
          // setHeight(intHeightArray);
          // // console.log("height arr",intHeightArray);

          // const intTempArray = temperatureArray.map((bigint) => Number(bigint));
          // setTemperature(intTempArray);
          // // console.log("temp arr",intTempArray);
          // console.log("link", link);
        }
        catch(e){
            console.log(e);
        }
    }
  return (
    <>
      <div className="first-ctr">
        <div className="second-ctr">
          <div className="second-ctr-one labdiv">
            <label className="lpatdetails">Name</label>
            &nbsp;&nbsp;<span>:</span>
            &nbsp;&nbsp; <span className="sppd"> {name}</span>
          </div>
          <div className="second-ctr-two labdiv">
            <label className="lpatdetails">Contact</label>
            &nbsp;&nbsp;<span>:</span>
            &nbsp;&nbsp;<span className="sppd"> {contact}</span>
          </div>
          {/* <div className="second-ctr-three labdiv">
            <label className="lpatdetails">Id</label>
            &nbsp;&nbsp;<span>:</span>
            &nbsp;&nbsp;<span className="sppd"> {patid}</span>
          </div> */}
        </div>
        <div className="third-ctr">
          <div className="Recordcard">
            <div className="title">
              <h2>Patient's Record</h2>
            </div>
            <div className="showRecords">
              <div className="clabel leftdetails">
                <div className="infodiv">
                  <label className="hllabel">Patient ID</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{pid}</span>
                </div>
                {/* <div className="infodiv">
                  <label className="hllabel">Weight</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{weight[ind]}</span>
                </div> */}
                <div className="clabel rightdetails">
                <div className="infodiv">
                  <label className="hrlabel">Age</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{age[ind]}</span>
                </div>
                <div className="infodiv">
                  <label className="hllabel">Donor Organs</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{donorOrgans[ind]}</span>
                </div>

                <div className="infodiv">
                  <label className="hrlabel">Date</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{date[ind]}</span>
                </div>

                <div className="infodiv">
                  <label className="hllabel">Donor Blood group</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{donorBloodgroup[ind]}</span>
                </div>

                {/* <div className="infodiv">
                  <label className="hllabel">Blood Pressure</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{bloodPressure[ind]}</span>
                </div> */}
                {/* <div className="infodiv">
                  <label className="hllabel">Body Temperature</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{temperature[ind]}</span>
                </div>
              </div> */}
              
                <div className="infodiv">
                  <label className="hrlabel">Donor Location</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{donorlocation[ind]}</span>
                </div>

                {/* <div className="infodiv">
                  <label className="hrlabel">Heart Rate</label>
                  <span className="separator-col">:</span>
                  <span className="healthpara">{heartRate[ind]}</span>
                </div> */}
                
              </div>
            </div>
          </div>
          {/* <div className="bottomdiv">
            <div className="bottomRecord">
              <label className="blabel">Prescription</label>
              <span className="separator-col separator-col-pres">:</span>
              <span className="bspan1">{prescription[ind]}</span>
            </div> */}
            {/* <div className="bottomRecord">
              <label className="blabel">Report</label>
              <span className="separator-col ">:</span>
              <span className="bspan2">
                <a className="hyplink" href={link[ind]} target="_blank">
                  Find here
                </a>
              </span>
            </div> */}
          </div>
           <div className="next-prevctr">
          <div id="prevbtn" className="prevbtndiv npbtn">
            <button
              className="prevbtn npbtntext patidsubbtn" onClick={getPrevious}
            >
              Prev
            </button>
          </div>
          <div id="nextbtn" className="nextbtndiv npbtn">
            <button className="nextbtn npbtntext patidsubbtn" onClick={getNext} >
              Next
            </button>
          </div>
        </div>
        <div className="sequence">
          <label className="sequence-number">
            {ind + 1}/{nrecords}
          </label>
        </div>
      </div>
        </div>
    </>
  );
}
