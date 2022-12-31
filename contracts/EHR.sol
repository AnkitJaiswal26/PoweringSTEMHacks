// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract EHR {
    address owner;

    struct User {
        address userAdd;
        string name;
        string personalAdd;
        string emailId;
        string mobileNo;
        uint256 gender;
        string dob;
    }

    struct Hospital {
        address hosAdd;
        string name;
        string personalAdd;
        string emailId;
        string contactNo;
    }

    struct ResearchOrg {
        address orgAdd;
        string name;
        string emailId;
        string contactNo;
    }

    struct Research {
        uint256 id;
        address orgAdd;
        string name;
        string description;
        string cid;
        string cidName;
        uint256 usersRequired;
        uint256 currentUsers;
    }

    struct Record {
        address userAdd;
        address hosAdd;
        string docName;
        string recordHash;
        string recordName;
        string issueDate;
        string testSuggested;
    }

    uint256 userCount;
    uint256 hospitalCount;
    uint256 recordCount;
    uint256 researchOrgCount;
    uint256 researchCount;

    mapping(uint256 => User) userMapping;
    mapping(uint256 => Hospital) hospitalMapping;
    mapping(uint256 => Record) recordMapping;
    mapping(uint256 => ResearchOrg) researchOrgMapping;
    mapping(uint256 => Research) researchMapping;

    mapping(address => uint256) userAddressMapping;
    mapping(address => uint256) hospitalAddressMapping;
    mapping(address => uint256) researchOrgAddressMapping;

    mapping(address => bool) existingUsers;
    mapping(address => bool) existingHospitals;
    mapping(address => bool) existingOrganizations;

    mapping(uint256 => uint256[]) userToHospitalAccessList;

    mapping(uint256 => uint256[]) userToResearchAccessList;

    modifier onlyOwner() {
        require(owner == msg.sender, "Not an owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Register
    function registerUser(
        string memory name,
        string memory personalAdd,
        string memory emailId,
        string memory mobileNo,
        uint256 gender,
        string memory dob
    ) public {
        userMapping[userCount++] = User(
            msg.sender,
            name,
            personalAdd,
            emailId,
            mobileNo,
            gender,
            dob
        );
        userAddressMapping[msg.sender] = userCount - 1;
        existingUsers[msg.sender] = true;
    }

    function registerHospital(
        string memory name,
        string memory personalAdd,
        string memory emailId,
        string memory mobileNo
    ) public {
        hospitalMapping[hospitalCount++] = Hospital(
            msg.sender,
            name,
            personalAdd,
            emailId,
            mobileNo
        );
        hospitalAddressMapping[msg.sender] = hospitalCount - 1;
        existingHospitals[msg.sender] = true;
    }

    function registerResearchOrg(
        string memory name,
        string memory emailId,
        string memory mobileNo
    ) public {
        researchOrgMapping[researchOrgCount++] = ResearchOrg(
            msg.sender,
            name,
            emailId,
            mobileNo
        );
        researchOrgAddressMapping[msg.sender] = researchOrgCount - 1;
        existingOrganizations[msg.sender] = true;
    }

    function checkRole() public view returns (uint256) {
        if (existingUsers[msg.sender] == true) {
            return 1;
        } else if (existingHospitals[msg.sender] == true) {
            return 2;
        } else if (existingOrganizations[msg.sender] == true) {
            return 3;
        }
        return 0;
    }

    // Create record/research
    function createNewRecord(
        address userAdd,
        string memory docName,
        string memory recordHash,
        string memory recordName,
        string memory issueDate,
        string memory testSuggested
    ) public {
        recordMapping[recordCount++] = Record(
            userAdd,
            msg.sender,
            docName,
            recordHash,
            recordName,
            issueDate,
            testSuggested
        );
    }

    function createNewResearch(
        string memory name,
        string memory description,
        string memory cid,
        string memory cidName,
        uint256 usersRequired
    ) public payable {
        uint256 price = usersRequired * 0.0001 ether;
        require(price == msg.value, "Please provide required ethers");

        researchMapping[researchCount] = Research(
            researchCount,
            msg.sender,
            name,
            description,
            cid,
            cidName,
            usersRequired,
            0
        );
        researchCount += 1;
    }

    // Access list for hospital
    function grantAccessToHospital(address hospitalAddress) public {
        uint256 id = hospitalAddressMapping[hospitalAddress];
        uint256 userId = userAddressMapping[msg.sender];
        for (uint256 i = 0; i < userToHospitalAccessList[userId].length; i++) {
            if (userToHospitalAccessList[userId][i] == id) {
                return;
            }
        }

        userToHospitalAccessList[userId].push(id);
    }

    function removeAccessFromHospital(address hospitalAddress) public {
        uint256 id = hospitalAddressMapping[hospitalAddress];
        uint256 userId = userAddressMapping[msg.sender];
        for (uint256 i = 0; i < userToHospitalAccessList[userId].length; i++) {
            if (userToHospitalAccessList[userId][i] == id) {
                userToHospitalAccessList[userId][i] = userToHospitalAccessList[
                    userId
                ][userToHospitalAccessList[userId].length - 1];
                userToHospitalAccessList[userId].pop();
            }
        }
    }

    function hasUserRecordAccessForHospital(
        address userAddress,
        address hospitalAddress
    ) public view returns (bool) {
        uint256 userId = userAddressMapping[userAddress];
        uint256 hosId = hospitalAddressMapping[hospitalAddress];

        for (uint256 i = 0; i < userToHospitalAccessList[userId].length; i++) {
            if (userToHospitalAccessList[userId][i] == hosId) {
                return true;
            }
        }
        return false;
    }

    // Access list for research
    function grantAccessToResearch(uint256 researchId) public payable {
        uint256 userId = userAddressMapping[msg.sender];
        for (uint256 i = 0; i < userToResearchAccessList[userId].length; i++) {
            if (userToResearchAccessList[userId][i] == researchId) {
                return;
            }
        }

        userToResearchAccessList[userId].push(researchId);
        researchMapping[researchId].currentUsers += 1;
        if (
            researchMapping[researchId].usersRequired <=
            researchMapping[researchId].currentUsers
        ) {
            payable(msg.sender).transfer(0.0001 ether);
        }
    }

    function removeAccessFromResearch(uint256 researchId) public payable {
        require(msg.value == 0.0001 ether);
        uint256 userId = userAddressMapping[msg.sender];

        for (uint256 i = 0; i < userToResearchAccessList[userId].length; i++) {
            if (userToResearchAccessList[userId][i] == researchId) {
                userToResearchAccessList[userId][i] = userToResearchAccessList[
                    userId
                ][userToResearchAccessList[userId].length - 1];
                userToResearchAccessList[userId].pop();

                researchMapping[researchId].currentUsers -= 1;
            }
        }
    }

    function hasUserRecordAccessForResearch(
        address userAddress,
        uint256 researchId
    ) public view returns (bool) {
        uint256 userId = userAddressMapping[userAddress];

        for (uint256 i = 0; i < userToResearchAccessList[userId].length; i++) {
            if (userToResearchAccessList[userId][i] == researchId) {
                return true;
            }
        }
        return false;
    }

    // User Functions
    function fetchAllHospitals() public view returns (Hospital[] memory) {
        Hospital[] memory items = new Hospital[](hospitalCount);
        for (uint256 i = 0; i < hospitalCount; i++) {
            Hospital storage currentItem = hospitalMapping[i];
            items[i] = currentItem;
        }
        return items;
    }

    function fetchMyHospitalAccessList()
        public
        view
        returns (Hospital[] memory)
    {
        uint256 userId = userAddressMapping[msg.sender];
        Hospital[] memory items = new Hospital[](
            userToHospitalAccessList[userId].length
        );

        for (uint256 i = 0; i < userToHospitalAccessList[userId].length; i++) {
            Hospital storage currentItem = hospitalMapping[
                userToHospitalAccessList[userId][i]
            ];
            items[i] = currentItem;
        }
        return items;
    }

    function fetchMyResearchAccessList()
        public
        view
        returns (Research[] memory)
    {
        uint256 userId = userAddressMapping[msg.sender];

        Research[] memory items = new Research[](
            userToResearchAccessList[userId].length
        );

        for (uint256 i = 0; i < userToResearchAccessList[userId].length; i++) {
            Research storage currentItem = researchMapping[
                userToResearchAccessList[userId][i]
            ];
            items[i] = currentItem;
        }
        return items;
    }

    function fetchMyDocuments() public view returns (Record[] memory) {
        uint256 itemCount;
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].userAdd == msg.sender) {
                itemCount += 1;
            }
        }

        console.log(itemCount);
        console.log(recordCount);

        Record[] memory items = new Record[](itemCount);
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].userAdd == msg.sender) {
                uint256 currentId = i;
                Record storage currentItem = recordMapping[currentId];
                items[currentId] = currentItem;
                currentId += 1;
            }
        }
        return items;
    }

    // Hospital Functions
    function fetchUserDocumentsForHospital(
        address userAddress
    ) public view returns (Record[] memory) {
        require(
            hasUserRecordAccessForHospital(userAddress, msg.sender) == true,
            "Does not has the access to fetch the documents"
        );

        uint256 itemCount;
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].userAdd == userAddress) {
                itemCount += 1;
            }
        }

        Record[] memory items = new Record[](itemCount);
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].userAdd == userAddress) {
                uint256 currentId = i;
                Record storage currentItem = recordMapping[currentId];
                items[currentId] = currentItem;
                currentId += 1;
            }
        }
        return items;
    }

    function getAllHospitalRecords() public view returns (Record[] memory) {
        uint256 itemCount;
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].hosAdd == msg.sender) {
                itemCount += 1;
            }
        }

        Record[] memory items = new Record[](itemCount);
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].hosAdd == msg.sender) {
                uint256 currentId = i;
                Record storage currentItem = recordMapping[currentId];
                items[currentId] = currentItem;
                currentId += 1;
            }
        }
        return items;
    }

    // Research Organization Functions
    function fetchUserDocumentsForResearch(
        address userAddress,
        uint256 researchId
    ) public view returns (Record[] memory) {
        require(
            hasUserRecordAccessForResearch(userAddress, researchId) == true,
            "Does not has the access to fetch the documents"
        );

        uint256 itemCount;
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].userAdd == userAddress) {
                itemCount += 1;
            }
        }

        Record[] memory items = new Record[](itemCount);
        for (uint256 i = 0; i < recordCount; i++) {
            if (recordMapping[i].userAdd == userAddress) {
                uint256 currentId = i;
                Record storage currentItem = recordMapping[currentId];
                items[currentId] = currentItem;
                currentId += 1;
            }
        }
        return items;
    }

    function fetchAllUsersForResearch(
        uint256 researchId
    ) public view returns (User[] memory) {
        uint256 count;
        for (uint256 i = 0; i < userCount; i++) {
            for (uint256 j = 0; j < userToResearchAccessList[i].length; j++) {
                if (userToResearchAccessList[i][j] == researchId) {
                    count += 1;
                    break;
                }
            }
        }

        User[] memory result = new User[](count);

        count = 0;

        for (uint256 i = 0; i < userCount; i++) {
            for (uint256 j = 0; j < userToResearchAccessList[i].length; j++) {
                if (userToResearchAccessList[i][j] == researchId) {
                    User storage currentUser = userMapping[i];
                    result[count] = currentUser;
                    count += 1;
                    break;
                }
            }
        }

        return result;
    }

    function fetchMyResearchs() public view returns (Research[] memory) {
        uint256 count;
        for (uint256 i = 0; i < researchCount; i++) {
            if (researchMapping[i].orgAdd == msg.sender) {
                count += 1;
            }
        }

        Research[] memory result = new Research[](count);
        count = 0;

        for (uint256 i = 0; i < researchCount; i++) {
            if (researchMapping[i].orgAdd == msg.sender) {
                Research storage curr = researchMapping[i];
                result[count] = curr;
                count += 1;
            }
        }

        return result;
    }

    // Common functions
    function fetchUserByAddress(
        address userAddress
    ) public view returns (User memory) {
        return userMapping[userAddressMapping[userAddress]];
    }

    function fetchHospitalByAddress(
        address hospitalAddress
    ) public view returns (Hospital memory) {
        return hospitalMapping[hospitalAddressMapping[hospitalAddress]];
    }

    function fetchOrganizationByAddress(
        address orgAddress
    ) public view returns (ResearchOrg memory) {
        return researchOrgMapping[researchOrgAddressMapping[orgAddress]];
    }

    function fetchResearchById(
        uint256 id
    ) public view returns (Research memory) {
        return researchMapping[id];
    }

    function fetchAllResearchs() public view returns (Research[] memory) {
        Research[] memory items = new Research[](researchCount);
        for (uint256 i = 0; i < researchCount; i++) {
            Research storage currentItem = researchMapping[i];
            items[i] = currentItem;
        }
        return items;
    }
}
