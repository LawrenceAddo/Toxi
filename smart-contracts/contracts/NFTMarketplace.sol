// SPDX-License-Identifier: MIT 

pragma solidity 0.8.6;

import "./ERC721Library/ERC721.sol";
import "./ERC721Library/access/Ownable.sol";
import "./ERC721Library/utils/Counters.sol";

contract NFTMarketplace is Ownable{
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdTracker;
    
    ERC721 erc721;
    
    uint256 public serviceFee;
    
    struct NFToken{
        string title;
        bool status; // True: OnSale, False: OffSale
        uint256 price;
        uint256 royalty;
        address creator;
    }
    
    mapping(uint256 => NFToken) public tokenData;
    
    uint256[] private nftsOnSale;
    mapping(uint256 => uint256) private _nftsIndex;
    
    event CreateNFT(address _creator, string _title, uint256 _royalty, string _identifier, bytes _memo);
    
    event ListNFT(uint256 _tokenId, uint256 _price);
    
    event UnListNFT(uint256 _tokenId);

    event BuyNFT(uint256 _tokenId, address _to, bytes _memo);

    event DeleteNFT(uint256 _tokenId,address _who);

    constructor(address _erc721address, string memory _baseTokenURI, uint256 _serviceFee){
        erc721 = ERC721(_erc721address);
        erc721.proxySetBaseURI(_baseTokenURI);
        serviceFee = _serviceFee;
    }

    fallback() external payable {}

    receive() external payable {}
    
    function changeServiceFee(uint256 _serviceFee) public onlyOwner{
        serviceFee = _serviceFee;
    }
    
    function changeBaseURI(string memory _baseTokenURI) public onlyOwner{
       erc721.proxySetBaseURI(_baseTokenURI);
    }
    
    function createNFT(address _creator, string memory _title, uint256 _royalty, string memory _identifier, bytes memory _memo)public{
        require(_creator == msg.sender,"NFT Market Place: You can't create NFT on behalf of others");
        _tokenIdTracker.increment();
        uint256 tokenId = _tokenIdTracker.current();
        erc721.proxySafeMint(_creator, tokenId, _memo);
        erc721.proxySetTokenURI(tokenId,_identifier);
        tokenData[tokenId] = NFToken(_title, false, 0, _royalty, _creator);
        emit CreateNFT(_creator, _title, _royalty, _identifier, _memo);
    }
    
    function updateRoyaltyOfNFT(uint256 _tokenId, uint256 _royalty)public{
        require(msg.sender==tokenData[_tokenId].creator,"NFT MarketPlace: Only owner of NFT can update royalty");
        tokenData[_tokenId].royalty = _royalty;
    }

    function listNFT(uint256 _tokenId, uint256 _price)public{
        require(erc721.ownerOf(_tokenId)==msg.sender,"NFT Market Place: Only owner of NFT can list");
        require(!tokenData[_tokenId].status,"NFT Market Place: NFT is already listed");
        tokenData[_tokenId].price = _price;
        tokenData[_tokenId].status = true;
        if(!erc721.isApprovedForAll(msg.sender, address(this)) && erc721.getApproved(_tokenId)!=address(this)){
            erc721.proxyApprove(address(this),_tokenId);
        }
        uint256 nftIndex = nftsOnSale.length;
        nftsOnSale.push(_tokenId);
        _nftsIndex[_tokenId] = nftIndex;
        emit ListNFT(_tokenId, _price);
    }
    
    function unListNFT(uint256 _tokenId)public{
        require(tx.origin==erc721.ownerOf(_tokenId) && tokenData[_tokenId].status,"NFT MarketPlace: Only owner of NFT can unlist NFT from MarketPlace or NFT is already unlisted");
        tokenData[_tokenId].status = false;
        uint256 nftIndex = _nftsIndex[_tokenId];
        delete nftsOnSale[nftIndex];
        delete _nftsIndex[_tokenId];
        emit UnListNFT(_tokenId);
    }
    
    function updatePriceOfNFT(uint256 _tokenId, uint256 _updatedPrice)public{
        require(msg.sender==erc721.ownerOf(_tokenId) && tokenData[_tokenId].status,"NFT MarketPlace: Only owner of NFT can update price");
        tokenData[_tokenId].price = _updatedPrice;
    }

    function buyNFT(uint256 _tokenId, address _to, bytes memory _memo)public payable{
        require(_to==_msgSender() && (tokenData[_tokenId].status),"NFT MarketPlace: only buyer can buy NFT when NFT is listed");
        address currentOwner = erc721.ownerOf(_tokenId);
        uint256 amount = tokenData[_tokenId].price;
        address creator = tokenData[_tokenId].creator;
        uint256 royalty = tokenData[_tokenId].royalty;
        uint256 royaltyAmount = (amount*royalty)/100;
        uint256 serviceFeeAmount = (amount*serviceFee)/100;
        if(creator == currentOwner){
            require(msg.value >= amount+ serviceFeeAmount, "NFT Marketplace: insufficient balance in your account to buy NFT");
        }else if(creator == _to){
            require(msg.value >= amount+ serviceFeeAmount, "NFT Marketplace: insufficient balance in your account to buy NFT");
        }else{
            require(msg.value >= amount+ serviceFeeAmount + royaltyAmount, "NFT Marketplace: insufficient balance in your account to buy NFT");
            (bool successForCreator, ) = payable(creator).call{value : royaltyAmount}("");
            require(successForCreator, "NFT Marketplace Buy: Sending money from buyer to creator is failed.");
        }
        (bool successForSeller, ) = payable(currentOwner).call{ value: amount - serviceFeeAmount }("");
        require(successForSeller, "NFT Marketplace Buy: Sending money from buyer to seller is failed.");
        (bool successForOwner, ) = payable(address(this)).call{ value: serviceFeeAmount*2 }("");
        require(successForOwner, "NFT Marketplace Buy: Sending service fee from buyer and seller to nft marketplace owner is failed.");
        erc721.safeTransferFrom(currentOwner,_to,_tokenId,_memo);
        tokenData[_tokenId].status = false;
        uint256 nftIndex = _nftsIndex[_tokenId];
        delete nftsOnSale[nftIndex];
        delete _nftsIndex[_tokenId];
        emit BuyNFT(_tokenId, _to, _memo);
    }

    function deleteNFT(uint256 _tokenId)public{
        require(msg.sender==erc721.ownerOf(_tokenId),"NFT MarketPlace: Only owner of NFT can delete");
        if(tokenData[_tokenId].status){
            this.unListNFT(_tokenId);
        }
        erc721.proxyBurn(_tokenId);
        delete tokenData[_tokenId];
        emit DeleteNFT(_tokenId, msg.sender);
    }
    
    function getMyItems()public view returns(uint256[] memory){
        address collector = msg.sender;
        uint256 bal = erc721.balanceOf(collector);
        uint256[] memory myItems;
        for(uint256 i=0; i<bal; i++){
            myItems[i] = erc721.tokenOfOwnerByIndex(collector,i);
        }
        return myItems;
    }

    function getMyListedItems()public view returns(uint256[] memory){
        address collector = msg.sender;
        uint256 bal = erc721.balanceOf(collector);
        uint256[] memory myItems;
        uint256 count=0;
        for(uint256 i=0; i<bal; i++){
            uint256 myItemId = erc721.tokenOfOwnerByIndex(collector,i);
            if(tokenData[myItemId].status){
                myItems[count] = myItemId;
                count = count + 1;
            }
        }
        return myItems;
    }

    function getMyCreatedItems()public view returns(uint256[] memory){
        address collector = msg.sender;
        uint256 bal = erc721.totalSupply();
        uint256[] memory myItems;
        uint256 count=0;
        for(uint256 i=0; i<bal; i++){
            uint256 myItemId = erc721.tokenByIndex(i);
            if(tokenData[myItemId].creator == collector){
                myItems[count] = myItemId;
                count = count + 1;
            }
        }
        return myItems;
    }

    function dashboardItems()public view returns(uint256[] memory){
        address collector = msg.sender;
        uint256 bal = erc721.totalSupply();
        uint256[] memory myItems;
        uint256 count=0;
        for(uint256 i=0; i<bal; i++){
            uint256 myItemId = erc721.tokenByIndex(i);
            if(erc721.ownerOf(myItemId) != collector && tokenData[myItemId].status){
                myItems[count] = myItemId;
                count = count + 1;
            }
        }
        return myItems;
    }
    
    function getNFTsOnSale() public view returns(uint256[] memory){
        return nftsOnSale;
    }
}