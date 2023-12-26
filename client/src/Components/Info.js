import React from "react";
import InformationCard from "./InformationCard";
import {
  faHeartPulse,
  faTruckMedical,
  // faTooth,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          We bring healthcare to your convenience, offering a comprehensive
          range of on-demand medical services tailored to your needs. Our
          platform allows you to connect with experienced online doctors who
          provide expert medical advice, issue online prescriptions, and offer
          quick refills whenever you require them.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Organ Transplant"
          description="• We propose a private Ethereum blockchain-based solution that ensures organ donation and transplantation
          management in a manner that is decentralized, secure,
          reliable, traceable, auditable, and trustworthy."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Smart Contracts"
          description="We develop smart contracts that register actors and
          ensure data provenance through producing events for
          all the necessary actions that occur during the organ
          donation and transplantation stages."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Organ Matching"
          description="We develop an auto-matching process between the donor
          and recipient through a smart contract based on certain
          criteria."
          icon={faHeartPulse}
        />
      </div>
    </div>
  );
}

export default Info;
