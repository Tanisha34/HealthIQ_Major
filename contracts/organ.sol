// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract organ {
    uint256 a;

    struct donor_account {
        //account for donor
        string name;
        uint contact;
        uint age;
        string id;
        string organs;
        string date;
        string donor_blood_group;
        string donor_location;
        string cid;
    }

    struct recipient_account {
        string name;
        uint contact;
        uint age;
        string id;
        string date;
        string organs_required;
        string recipient_blood_group;
        string recipient_location;
        string recipient_cid;
    }

    struct doctor_account {
        //account for doctor
        string name;
        uint contact;
        string id;
        string password;
        address adrr;
    }

    mapping(string => bool) public is_doctor_registered; //username of registered doctors
    doctor_account[] public doctor_register; //registered doctors
    mapping(string => doctor_account) public registered_id; //maps usernames with accounts

    mapping(string => bool) public is_donor_registered; //username of registered donors
    mapping(string => bool) public is_recipient_registered; //username of registered recipients

    donor_account[] public donor_register; //registered donors
    mapping(string => donor_account) public donor_map; // mapping of donor id with donor account

    recipient_account[] public recipient_register; //registered recipients
    mapping(string => recipient_account) public recipient_map; // mapping of recipient id with recipient account

    function getter() public view returns (uint256) {
        return a;
    }

    function doctorSignUp(
        string memory _name,
        uint _contact,
        string memory _id,
        string memory _password
    ) public {
        require(is_doctor_registered[_id] == false);
        is_doctor_registered[_id] = true;
        doctor_account memory new_doctor = doctor_account(
            _name,
            _contact,
            _id,
            _password,
            msg.sender
        );
        doctor_register.push(new_doctor);
        registered_id[_id] = new_doctor;
    }

    function doctorSignIn(
        string memory _id,
        string memory _password
    ) public view returns (bool) {
        require(is_doctor_registered[_id] == true);
        doctor_account memory current_account = registered_id[_id];
        require(
            keccak256(abi.encodePacked(_id)) ==
                keccak256(abi.encodePacked(current_account.id))
        );
        require(
            keccak256(abi.encodePacked(_password)) ==
                keccak256(abi.encodePacked(current_account.password))
        );
        // require(keccak256(abi.encodePacked(msg.sender)) == keccak256(abi.encodePacked(current_account.adrr)));
        return true;
    }


    function view_donor_details(
        string memory _id
    ) public view returns (donor_account memory) {
       // require(is_donor_registered[_id] == true);
        return donor_map[_id];
    }

    function view_recipient_details(
        string memory _id
    ) public view returns (recipient_account memory) {
        //require(is_recipient_registered[_id] == true);
        return recipient_map[_id];
    }

    function donorSubmitDetails(
        string memory _id,
        string memory _name,
        uint _contact,
        uint _age,
        string memory _organ,
        string memory _date,
        string memory _bg,
        string memory _location,
        string memory _cid
    ) public {
        donor_account memory new_donoraccount = donor_account(
            _name,
            _contact,
            _age,
            _id,
            _organ,
            _date,
            _bg,
            _location,
            _cid
        );
        donor_map[_id] = new_donoraccount; // key: id value: donor account details
    }

    function recipientSubmitDetails(
        string memory _id,
        string memory _name,
        uint _contact,
        uint _age,
        string memory _organ,
        string memory _date,
        string memory _bg,
        string memory _location,
        string memory _cid
    ) public {
        recipient_account memory new_recipientaccount = recipient_account(
            _name,
            _contact,
            _age,
            _id,
            _organ,
            _date,
            _bg,
            _location,
            _cid
        );
        recipient_map[_id] = new_recipientaccount; // key: id value: recipient account details
    }
}
