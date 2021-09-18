const ERC721 = artifacts.require("./ERC721Library/ERC721.sol");
const NFTMarketplace = artifacts.require("./NFTMarketplace.sol");

module.exports = async function (deployer, network, accounts) {
  let erc721;
  let nftmarketplace;
  let baseuri = "https://ipfs.infura.io/";
  let servicefee = 2; // in percentage

  await deployer.deploy(ERC721,"Quant Hackers","QNTH")
  .then(function(instance){
    erc721 = instance;
  });
  deployer.link(ERC721, NFTMarketplace);

  await deployer.deploy(NFTMarketplace, ERC721.address, baseuri, servicefee)
  .then(function(instance){
    nftmarketplace = instance;
  });
};
