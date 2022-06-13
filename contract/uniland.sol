pragma solidity ^0.8.13;


contract UniLand is ERC721 {

    struct SubLand {
        string name;
        string url;
        address authorized_address;
        uint authorized_until;
    }

    struct Land { 
        string name;
        string url;
        uint subland_size;
        mapping(uint256 => SubLand) sublands;
    }

    event Authorize(address from, address indexed to, uint until, uint256 indexed land_id, uint256 indexed subland_id);

    address public admin;
    uint public land_size;
    mapping(uint256 => Land) public lands;

    constructor (uint land_size_) ERC721("UniLand", "UL") { 
        land_size = land_size_;
        admin = msg.sender;
    }

    function _check_land_id(uint land_id) private view {
        if(land_id >= land_size * land_size) { revert("land_id should be lower than land_size*land_size"); }
    }

    function _check_subland_id(uint land_id, uint subland_id) private view {
        _check_land_id(land_id);
        uint subland_size = lands[land_id].subland_size;
        if(subland_id >= subland_size * subland_size) { revert("subland_id should be lower than subland_size*subland_size"); }
    }

    function sublands(uint land_id, uint subland_id) public view returns(SubLand memory) {
        _check_subland_id(land_id, subland_id);
        return lands[land_id].sublands[subland_id];
    }

    function mintLand(address to, uint land_id, string memory name, string memory url, uint subland_size) public {
        if(msg.sender != admin) { revert("Only admin can mint!"); }
        _check_land_id(land_id);
        ERC721._safeMint(to, land_id);
        lands[land_id].name = name;
        lands[land_id].url = url;
        lands[land_id].subland_size = subland_size;
    }

    function updateLandName(uint land_id, string memory name) public {
        _check_land_id(land_id);
        if(msg.sender != ERC721.ownerOf(land_id)) { revert("Only owner can update a Land!"); }
        lands[land_id].name = name;
    }

    function updateLandURL(uint land_id, string memory url) public {
        _check_land_id(land_id);
        if(msg.sender != ERC721.ownerOf(land_id)) { revert("Only owner can update a Land!"); }
        lands[land_id].url = url;
    }

    function landX(uint land_id) public view returns(uint) {
        _check_land_id(land_id);
        return land_id / land_size;
    }

    function landY(uint land_id) public view returns(uint) {
        _check_land_id(land_id);
        return land_id % land_size;
    }

    function sublandX(uint land_id, uint subland_id) public view returns(uint) {
        _check_subland_id(land_id, subland_id);
        return subland_id / lands[land_id].subland_size;
    }

    function sublandY(uint land_id, uint subland_id) public view returns(uint) {
        _check_subland_id(land_id, subland_id);
        return subland_id % lands[land_id].subland_size;
    }

    function _check_owner_or_authorised(uint land_id, uint subland_id) private view {
        _check_subland_id(land_id, subland_id);
        address authorized_address = lands[land_id].sublands[subland_id].authorized_address;
        uint authorized_until = lands[land_id].sublands[subland_id].authorized_until;

        bool is_owner = msg.sender == ERC721.ownerOf(land_id);
        bool is_authorized = msg.sender == authorized_address && block.timestamp <= authorized_until;

        if(!is_owner && !is_authorized) {
            revert("Only owner or authorized can update subland!"); 
        }
    }

    function authorizeSubland(uint land_id, uint subland_id, address authorized_address, uint authorized_until) public {
        _check_subland_id(land_id, subland_id);
        if(msg.sender != ERC721.ownerOf(land_id)) {
            revert("Only owner can authorize subland!"); 
        }
        lands[land_id].sublands[subland_id].authorized_address = authorized_address;
        lands[land_id].sublands[subland_id].authorized_until = authorized_until;

        emit Authorize(msg.sender, authorized_address, authorized_until, land_id, subland_id);
        
    }

    function updateSublandName(uint land_id, uint subland_id, string memory name) public {
        _check_owner_or_authorised(land_id, subland_id);
        lands[land_id].sublands[subland_id].name = name;
    }

    function updateSublandURL(uint land_id, uint subland_id, string memory url) public {
        _check_owner_or_authorised(land_id, subland_id);
        lands[land_id].sublands[subland_id].url = url;
    }
}