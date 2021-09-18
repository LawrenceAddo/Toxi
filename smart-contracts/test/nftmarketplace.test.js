const ERC721 = artifacts.require("./ERC721Library/ERC721.sol");
const NFTMarketplace = artifacts.require("./NFTMarketplace.sol");

const chai=require("./chaisetup.js");
const { assert } = require('chai');
const BN = web3.utils.BN;
const expect= chai.expect;

let erc721;
let  nftmarketplace;

before(async()=>{
    erc721 = await ERC721.deployed();
    nftmarketplace = await NFTMarketplace.deployed();
});

contract("NFT Market Place", async(accounts)=>{

    describe("Market Place deployement in Blockchain",async()=>{
        it("ERC721 delpoys successfully",async()=>{
            const address = erc721.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        });
        it("nftmarketplace delpoys successfully",async()=>{
            const address = nftmarketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        });
        it("deploys with token name Quant Hackers",async()=>{
            const name = await erc721.name()
            assert.equal(name,"Quant Hackers","Quant Hackers token name hasn't assigned properly")
        });
        it("delpoys with token symbol QNTH",async()=>{
            const symbol = await erc721.symbol()
            assert.equal(symbol,"QNTH","QNTH symbol hasn't assigned properly")
        });
        it("deploys with 0 total supply of NFTs",async()=>{
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,0,"NFTs must be 0 at the stage of deployment")
        });
        it("deploys service fee with 2 percent initially",async()=>{
            const servicefee = await nftmarketplace.serviceFee()
            assert.equal(servicefee,2,"Service fee must be 2 percent at the stage of deployment")
        });
        it("deploys base uri with https://ipfs.infura.io/", async()=>{
            const baseuri = "https://ipfs.infura.io/"
            const value = await erc721._baseTokenURI();
            assert.equal(baseuri,value,"Error in setting base URI while deployment of NFT Marketplace contract")
        });
        it("ERC721 owner should be accounts[0]",async()=>{
            const owner = await nftmarketplace.owner()
            assert.equal(owner,accounts[0],"Only deployer should be the owner of ERC721")
        });
        it("NFT Marketplace owner should be accounts[0]",async()=>{
            const owner = await nftmarketplace.owner()
            assert.equal(owner,accounts[0],"Only deployer should be the owner of NFT Marketplace")
        });
    });

    describe("Creating NFTs in Market place", async()=>{
        it("Creator-1 should create NFT with token id 1 successfully", async()=>{
            const title = "Champions Cup";
            const creator1 = accounts[1];
            const royalty = 10;
            const identifier = "QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L1" // ipfs hash of metadata json file
            const memo = "0x0" // remarks
            expect(await nftmarketplace.createNFT(creator1, title, royalty, identifier, memo,{
                from : creator1
            }))
            const balanceOfMinter = await erc721.balanceOf(creator1)
            assert.equal(1,balanceOfMinter.toNumber(),"Balance of minter should update successfully")
            const ownerOfNFT = await erc721.ownerOf(1)
            assert.equal(creator1,ownerOfNFT,"Owner of minted NFT should be minter")
            const tokenURIofNFT = await erc721.tokenURI(1)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L1","Generated token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(creator1, 0)
            assert.equal(tokenOfOwnerByIndex.toNumber(),1,"Token Id of minters NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(0)
            assert.equal(tokenByIndex.toNumber(),1,"Out of all NFTs in market place, token Id should be correct for given index")
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            assert.equal(nftsOnSaleLength,0,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.status,false,"NFT shouldn't be listed immediately after creating NFT")
            assert.equal(nftDetails.title,"Champions Cup","NFT should be correct")
            assert.equal(nftDetails.price,'0',"Price shouldn't be updated successfully while creation");
            assert.equal(nftDetails.creator,creator1,"Creator of NFT should be minter of NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be created by creator of NFT");
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,1,"Total supply must be updated after the minting of new NFT");
        });
        it("Creator-1 should create multiple NFTs with new token id 2 successfully", async()=>{
            const title = "Champions Medal";
            const creator1 = accounts[1];
            const royalty = 10;
            const identifier = "QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L2" // ipfs hash of metadata json file
            const memo = "0x0" // remarks
            expect(await nftmarketplace.createNFT(creator1, title, royalty, identifier, memo,{
                from : creator1
            }))
            const balanceOfMinter = await erc721.balanceOf(creator1)
            assert.equal(2,balanceOfMinter.toNumber(),"Balance of minter should update successfully")
            const ownerOfNFT = await erc721.ownerOf(2)
            assert.equal(creator1,ownerOfNFT,"Owner of minted NFT should be minter")
            const tokenURIofNFT = await erc721.tokenURI(2)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L2","Generated token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(creator1, 1)
            assert.equal(tokenOfOwnerByIndex.toNumber(),2,"Token Id of minters NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(1)
            assert.equal(tokenByIndex.toNumber(),2,"Out of all NFTs in market place, token Id should be correct for given index")
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            assert.equal(nftsOnSaleLength,0,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(2);
            assert.equal(nftDetails.status,false,"NFT shouldn't be listed immediately after creating NFT")
            assert.equal(nftDetails.title,"Champions Medal","NFT should be correct")
            assert.equal(nftDetails.price,'0',"Price shouldn't be updated successfully while creation of NFT");
            assert.equal(nftDetails.creator,creator1,"Creator of NFT should be minter of NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be created by creator of NFT");
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,2,"Total supply must be updated after the minting of new NFT")
        });
        it("Creator-2 should create NFT with token id 3 successfully",async()=>{
            const title = "Winning Moment";
            const creator2 = accounts[2];
            const royalty = 10;
            const identifier = "QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L3" // ipfs hash of metadata json file
            const memo = "0x0" // remarks
            expect(await nftmarketplace.createNFT(creator2, title, royalty, identifier, memo,{
                from : creator2
            }))
            const balanceOfMinter = await erc721.balanceOf(creator2)
            assert.equal(1,balanceOfMinter.toNumber(),"Balance of minter should update successfully")
            const ownerOfNFT = await erc721.ownerOf(3)
            assert.equal(creator2,ownerOfNFT,"Owner of minted NFT should be minter")
            const tokenURIofNFT = await erc721.tokenURI(3)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L3","Generated token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(creator2, 0)
            assert.equal(tokenOfOwnerByIndex.toNumber(),3,"Token Id of minters NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(2)
            assert.equal(tokenByIndex.toNumber(),3,"Out of all NFTs in market place, token Id should be correct for given index")
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            assert.equal(nftsOnSaleLength,0,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(3);
            assert.equal(nftDetails.status,false,"NFT shouldn't be listed immediately after creating NFT")
            assert.equal(nftDetails.title,"Winning Moment","NFT should be correct")
            assert.equal(nftDetails.price,'0',"Price shouldn't be updated successfully");
            assert.equal(nftDetails.creator,creator2,"Creator of NFT should be minter of NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be created by creator of NFT");
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,3,"Total supply must be updated after the minting of new NFT")
        });
    });

    describe("Listing NFTs in Market Place",async()=>{
        it("After minter created NFT with tokenId 1, should list in Market Place successfully", async()=>{
            const tokenId = 1;
            const price = "30000000000000000" // 0.03 Ether
            const minter = accounts[1]
            expect(await nftmarketplace.listNFT(tokenId, price, {
                from: minter
            }));
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            assert.equal(nftsOnSaleLength,1,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.status,true,"NFT should be listed after creating NFT")
            assert.equal(nftDetails.title,"Champions Cup","NFT should be correct")
            assert.equal(nftDetails.price,'30000000000000000',"Price should be updated successfully after creation of NFT");
            assert.equal(nftDetails.creator,minter,"Creator of NFT should be minter of NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be correct");
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,3,"Total supply mustn't be updated after the listing of NFT");
        });
        it("After minter created NFT with tokenId 2, should list in Market Place successfully", async()=>{
            const tokenId = 2;
            const price = "40000000000000000" // 0.03 Ether
            const minter = accounts[1]
            expect(await nftmarketplace.listNFT(tokenId, price, {
                from: minter
            }));
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            assert.equal(nftsOnSaleLength,2,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(2);
            assert.equal(nftDetails.status,true,"NFT should be listed after creating NFT")
            assert.equal(nftDetails.title,"Champions Medal","NFT should be correct")
            assert.equal(nftDetails.price,'40000000000000000',"Price should be updated successfully after creation of NFT");
            assert.equal(nftDetails.creator,minter,"Creator of NFT should be minter of NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be correct");
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,3,"Total supply mustn't be updated after the listing of NFT");
        });
        it("Listing NFT by non-owner should fail", async()=>{
            const tokenId = 3;
            const price = "50000000000000000" // 0.03 Ether
            const minter = accounts[1]
            expect(nftmarketplace.listNFT(tokenId, price, {
                from: minter
            })).to.eventually.be.rejected;
        });
        it("After minter created NFT with tokenId 3, should list in Market Place successfully", async()=>{
            const tokenId = 3;
            const price = "50000000000000000" // 0.03 Ether
            const minter = accounts[2]
            expect(await nftmarketplace.listNFT(tokenId, price, {
                from: minter
            }));
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            assert.equal(nftsOnSaleLength,3,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(3);
            assert.equal(nftDetails.status,true,"NFT should be listed after creating NFT")
            assert.equal(nftDetails.title,"Winning Moment","NFT should be correct")
            assert.equal(nftDetails.price,'50000000000000000',"Price should be updated successfully after creation of NFT");
            assert.equal(nftDetails.creator,minter,"Creator of NFT should be minter of NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be correct");
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,3,"Total supply mustn't be updated after the listing of NFT");
        });
        it("Listing NFT twice should fail", async()=>{
            const tokenId = 3;
            const price = "50000000000000000" // 0.03 Ether
            const minter = accounts[2]
            expect(nftmarketplace.listNFT(tokenId, price, {
                from: minter
            })).to.eventually.be.rejected;
        });
        it("Listing NFT which isn't yet created should fail", async()=>{
            const tokenId = 4;
            const price = "50000000000000000" // 0.03 Ether
            const minter = accounts[0]
            expect(nftmarketplace.listNFT(tokenId, price, {
                from: minter
            })).to.eventually.be.rejected;
        });
    });
    
    describe("Transfering Ownership of NFTs by ERC721",async()=>{
        it("creator-1 should transfer ownership of NFT with token id 2 to accounts[3] successfully",async()=>{
            const fromAddr = accounts[1]
            const toAddr = accounts[3]
            const tokenId = 2
            const nftsOnSale = await nftmarketplace.getNFTsOnSale();
            const nftsOnSaleLength = nftsOnSale.length;
            expect(await erc721.safeTransferFrom(fromAddr,toAddr,tokenId,{
                from : fromAddr
            }));
            
            const afterTransferNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            const count = afterTransferNFTsOnSale.length
            assert.equal(nftsOnSaleLength,count,"Token should remain listed if listed or unlilsted if unlisted before transferring NFT")
            const nftDetails = await nftmarketplace.tokenData(2);
            assert.equal(nftDetails.status,true,"NFT should be listed as it is listed before transfer")
            assert.equal(nftDetails.title,"Champions Medal","NFT should be correct")
            assert.equal(nftDetails.price,'40000000000000000',"Price shouldn't be updated after transfer of NFT");
            assert.equal(nftDetails.creator,fromAddr,"Creator of NFT should remain same");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be correct");
            
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,3,"Total supply shouldn't be updated after the transferring of NFT");
            const balanceOfSender = await erc721.balanceOf(fromAddr)
            assert.equal(1,balanceOfSender.toNumber(),"Balance of sender should update successfully")
            const balanceOfReceiver = await erc721.balanceOf(toAddr)
            assert.equal(1,balanceOfReceiver.toNumber(),"Balance of receiver should update successfully")
            const ownerOfNFT = await erc721.ownerOf(2)
            assert.equal(toAddr,ownerOfNFT,"Owner of received NFT should be receiver")
            const tokenURIofNFT = await erc721.tokenURI(2)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L2","Transfered token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(toAddr, 0)
            assert.equal(tokenOfOwnerByIndex.toNumber(),2,"Token Id of receiver NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(1)
            assert.equal(tokenByIndex.toNumber(),2,"Out of all NFTs in market place, token Id shouldn't be changed for given index")
            
        });
        it("transfer Ownership of NFT should fail by non-owner", async()=>{
            const fromAddr = accounts[1]
            const toAddr = accounts[3]
            const tokenId = 2
            expect(erc721.safeTransferFrom(fromAddr,toAddr,tokenId,{
                from : fromAddr
            })).to.eventually.be.rejected;
        });
    });
    
    describe("Buying NFT from Market Place",async()=>{
        it("buyer-1 should buy NFT of token id 1 successfully from creator-1 without royalties",async()=>{
            const tokenId = 1
            const buyer = accounts[4]
            const memo = "0x0"
            const nftDataBeforeBuy = await nftmarketplace.tokenData(1);
            const previousOwner = await erc721.ownerOf(1);
            const statusBefore = nftDataBeforeBuy.status;
            assert.equal(previousOwner,accounts[1],"Previous Owner of NFT is not correct")
            assert.equal(statusBefore,true,"NFT should be listed before buying")
            const price =  nftDataBeforeBuy.price
            const serviceFee = await nftmarketplace.serviceFee()
            const serviceFeeAmount = (price*serviceFee)/100
            const amount = Number(price) + Number(serviceFeeAmount) 
            expect(await nftmarketplace.buyNFT(tokenId,buyer,memo,{
                from: buyer,
                value: amount
            }))
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.status,false,"NFT should be unlisted immediately after buying");
            assert.equal(nftDetails.creator,accounts[1],"Creator of NFT shouldn't be changed after buying NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT shouldn't be changed after buying NFT");
            const balanceOfSender = await erc721.balanceOf(previousOwner)
            assert.equal(0,balanceOfSender.toNumber(),"Balance of previous owner should update successfully")
            const balanceOfReceiver = await erc721.balanceOf(buyer)
            assert.equal(1,balanceOfReceiver.toNumber(),"Balance of buyer should update successfully")
            const ownerOfNFT = await erc721.ownerOf(1)
            assert.equal(buyer,ownerOfNFT,"Owner of received NFT should be buyer")
            const tokenURIofNFT = await erc721.tokenURI(1)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L1","Transfered token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(buyer, 0)
            assert.equal(tokenOfOwnerByIndex.toNumber(),1,"Token Id of buyer NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(0)
            assert.equal(tokenByIndex.toNumber(),1,"Out of all NFTs in market place, token Id shouldn't be changed for given index")
            const totalNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            const total = totalNFTsOnSale.length;
            let count = 0;
            for(let i=0;i<total;i++){
                const tokenId = totalNFTsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,2,"Bought NFT should be removed from NFTs on Sale")
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,3,"Total supply must not be updated after the buying NFT")
        })
        it("buyer-1 should now list nft of token id 1 for sale successfully", async()=>{
            const tokenId = 1;
            const price = "50000000000000000" // 0.03 Ether
            const buyer1 = accounts[4]
            expect(await nftmarketplace.listNFT(tokenId, price, {
                from: buyer1
            }));
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            let count = 0;
            for(let i=0;i<nftsOnSaleLength;i++){
                const tokenId = nftsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,3,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.status,true,"NFT should be listed after creating NFT")
            assert.equal(nftDetails.title,"Champions Cup","NFT should be correct")
            assert.equal(nftDetails.price,'50000000000000000',"Price should be updated successfully after creation of NFT");
            assert.equal(nftDetails.creator,accounts[1],"Creator of NFT should be who created the NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be correct");
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,3,"Total supply mustn't be updated after the listing of NFT");
        })
        it("buyer-2 should buy NFT of token id 1 successfully from buyer-1 with royalties",async()=>{
            const tokenId = 1
            const buyer = accounts[5]
            const memo = "0x0"
            const nftDataBeforeBuy = await nftmarketplace.tokenData(1);
            const previousOwner = await erc721.ownerOf(1);
            const statusBefore = nftDataBeforeBuy.status;
            assert.equal(previousOwner,accounts[4],"Previous Owner of NFT is not correct")
            assert.equal(statusBefore,true,"NFT should be listed before buying")
            const price =  nftDataBeforeBuy.price
            const serviceFee = await nftmarketplace.serviceFee()
            const serviceFeeAmount = (price*serviceFee)/100
            const royalty = nftDataBeforeBuy.royalty
            const royaltyAmount = (price*royalty)/100
            const amount = Number(price) + Number(serviceFeeAmount) + Number(royaltyAmount)
            expect(await nftmarketplace.buyNFT(tokenId,buyer,memo,{
                from: buyer,
                value: amount
            }))
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.status,false,"NFT should be unlisted immediately after buying");
            assert.equal(nftDetails.creator,accounts[1],"Creator of NFT shouldn't be changed after buying NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT shouldn't be changed after buying NFT");
            const balanceOfSender = await erc721.balanceOf(previousOwner)
            assert.equal(0,balanceOfSender.toNumber(),"Balance of previous owner should update successfully")
            const balanceOfReceiver = await erc721.balanceOf(buyer)
            assert.equal(1,balanceOfReceiver.toNumber(),"Balance of buyer should update successfully")
            const ownerOfNFT = await erc721.ownerOf(1)
            assert.equal(buyer,ownerOfNFT,"Owner of received NFT should be buyer")
            const tokenURIofNFT = await erc721.tokenURI(1)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L1","Transfered token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(buyer, 0)
            assert.equal(tokenOfOwnerByIndex.toNumber(),1,"Token Id of buyer NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(0)
            assert.equal(tokenByIndex.toNumber(),1,"Out of all NFTs in market place, token Id shouldn't be changed for given index")
            const totalNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            const total = totalNFTsOnSale.length;
            let count = 0;
            for(let i=0;i<total;i++){
                const tokenId = totalNFTsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,2,"Bought NFT should be removed from NFTs on Sale")
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,3,"Total supply must not be updated after the buying NFT")
        })
        it("buyer-2 should now list nft of token id 1 for sale successfully", async()=>{
            const tokenId = 1;
            const price = "50000000000000000" // 0.03 Ether
            const buyer2 = accounts[5]
            expect(await nftmarketplace.listNFT(tokenId, price, {
                from: buyer2
            }));
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            let count = 0;
            for(let i=0;i<nftsOnSaleLength;i++){
                const tokenId = nftsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,3,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.status,true,"NFT should be listed after creating NFT")
            assert.equal(nftDetails.title,"Champions Cup","NFT should be correct")
            assert.equal(nftDetails.price,'50000000000000000',"Price should be updated successfully after creation of NFT");
            assert.equal(nftDetails.creator,accounts[1],"Creator of NFT should be who created the NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be correct");
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,3,"Total supply mustn't be updated after the listing of NFT");
        })
        it("creator-1 should buy NFT of token id 1 successfully from buyer-2 without royalties",async()=>{
            const tokenId = 1
            const creator1 = accounts[1]
            const memo = "0x0"
            const nftDataBeforeBuy = await nftmarketplace.tokenData(1);
            const previousOwner = await erc721.ownerOf(1);
            const statusBefore = nftDataBeforeBuy.status;
            assert.equal(previousOwner,accounts[5],"Previous Owner of NFT is not correct")
            assert.equal(statusBefore,true,"NFT should be listed before buying")
            const price =  nftDataBeforeBuy.price
            const serviceFee = await nftmarketplace.serviceFee()
            const serviceFeeAmount = (price*serviceFee)/100
            const amount = Number(price) + Number(serviceFeeAmount) 
            expect(await nftmarketplace.buyNFT(tokenId,creator1,memo,{
                from: creator1,
                value: amount
            }))
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.status,false,"NFT should be unlisted immediately after buying");
            assert.equal(nftDetails.creator,accounts[1],"Creator of NFT shouldn't be changed after buying NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT shouldn't be changed after buying NFT");
            const balanceOfSender = await erc721.balanceOf(previousOwner)
            assert.equal(0,balanceOfSender.toNumber(),"Balance of previous owner should update successfully")
            const balanceOfReceiver = await erc721.balanceOf(creator1)
            assert.equal(1,balanceOfReceiver.toNumber(),"Balance of buyer should update successfully")
            const ownerOfNFT = await erc721.ownerOf(1)
            assert.equal(creator1,ownerOfNFT,"Owner of received NFT should be buyer")
            const tokenURIofNFT = await erc721.tokenURI(1)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L1","Transfered token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(creator1, 0)
            assert.equal(tokenOfOwnerByIndex.toNumber(),1,"Token Id of buyer NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(0)
            assert.equal(tokenByIndex.toNumber(),1,"Out of all NFTs in market place, token Id shouldn't be changed for given index")
            const totalNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            const total = totalNFTsOnSale.length;
            let count = 0;
            for(let i=0;i<total;i++){
                const tokenId = totalNFTsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,2,"Bought NFT should be removed from NFTs on Sale")
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,3,"Total supply must not be updated after the buying NFT")
        })
        it("buyer-3 should buy NFT of token id 3 successfully from current owner with royalties",async()=>{
            const tokenId = 3
            const buyer3 = accounts[6]
            const memo = "0x0"
            const nftDataBeforeBuy = await nftmarketplace.tokenData(3);
            const previousOwner = await erc721.ownerOf(3);
            const statusBefore = nftDataBeforeBuy.status;
            assert.equal(previousOwner,accounts[2],"Previous Owner of NFT is not correct")
            assert.equal(statusBefore,true,"NFT should be listed before buying")
            const price =  nftDataBeforeBuy.price
            const serviceFee = await nftmarketplace.serviceFee()
            const serviceFeeAmount = (price*serviceFee)/100
            const royalty = nftDataBeforeBuy.royalty
            const royaltyAmount = (price*royalty)/100
            const amount = Number(price) + Number(serviceFeeAmount) + Number(royaltyAmount)
            expect(await nftmarketplace.buyNFT(tokenId,buyer3,memo,{
                from: buyer3,
                value: amount
            }));
            const nftDetails = await nftmarketplace.tokenData(3);
            assert.equal(nftDetails.status,false,"NFT should be unlisted immediately after buying");
            assert.equal(nftDetails.creator,accounts[2],"Creator of NFT shouldn't be changed after buying NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT shouldn't be changed after buying NFT");
            const balanceOfSender = await erc721.balanceOf(previousOwner)
            assert.equal(0,balanceOfSender.toNumber(),"Balance of previous owner should update successfully")
            const balanceOfReceiver = await erc721.balanceOf(buyer3)
            assert.equal(1,balanceOfReceiver.toNumber(),"Balance of buyer should update successfully")
            const ownerOfNFT = await erc721.ownerOf(3)
            assert.equal(buyer3,ownerOfNFT,"Owner of received NFT should be buyer")
            const tokenURIofNFT = await erc721.tokenURI(3)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L3","Transfered token URI should be correct for NFT")
            const tokenOfOwnerByIndex = await erc721.tokenOfOwnerByIndex(buyer3, 0)
            assert.equal(tokenOfOwnerByIndex.toNumber(),3,"Token Id of buyer NFT index should be correct")
            const tokenByIndex = await erc721.tokenByIndex(2)
            assert.equal(tokenByIndex.toNumber(),3,"Out of all NFTs in market place, token Id shouldn't be changed for given index")
            const totalNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            const total = totalNFTsOnSale.length;
            let count = 0;
            for(let i=0;i<total;i++){
                const tokenId = totalNFTsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,1,"Bought NFT should be removed from NFTs on Sale")
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,3,"Total supply must not be updated after the buying NFT")
        })
        it("buyer-3 should now list nft of token id 3 for sale successfully", async()=>{
            const tokenId = 3;
            const price = "80000000000000000" // 0.03 Ether
            const buyer3 = accounts[6]
            expect(await nftmarketplace.listNFT(tokenId, price, {
                from: buyer3
            }));
            const nftsOnSale = await nftmarketplace.getNFTsOnSale()
            const nftsOnSaleLength = nftsOnSale.length
            let count = 0;
            for(let i=0;i<nftsOnSaleLength;i++){
                const tokenId = nftsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,2,"As soon as minting is done, NFTs should not be listed for sale.")
            const nftDetails = await nftmarketplace.tokenData(3);
            assert.equal(nftDetails.status,true,"NFT should be listed after creating NFT")
            assert.equal(nftDetails.title,"Winning Moment","NFT should be correct")
            assert.equal(nftDetails.price,'80000000000000000',"Price should be updated successfully after creation of NFT");
            assert.equal(nftDetails.creator,accounts[2],"Creator of NFT should be who created the NFT");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT should be correct");
            const totalsupply = await erc721.totalSupply();
            assert.equal(totalsupply,3,"Total supply mustn't be updated after the listing of NFT");
        })
        it("buyer-4 buying NFT of token ID 3 without royalty should fail",async()=>{
            const tokenId = 3
            const buyer4 = accounts[7]
            const memo = "0x0"
            const nftDataBeforeBuy = await nftmarketplace.tokenData(3);
            const previousOwner = await erc721.ownerOf(3);
            const statusBefore = nftDataBeforeBuy.status;
            assert.equal(previousOwner,accounts[6],"Previous Owner of NFT is not correct")
            assert.equal(statusBefore,true,"NFT should be listed before buying")
            const price =  nftDataBeforeBuy.price
            const serviceFee = await nftmarketplace.serviceFee()
            const serviceFeeAmount = (price*serviceFee)/100
            const amount = Number(price) + Number(serviceFeeAmount)
            expect(nftmarketplace.buyNFT(tokenId,buyer4,memo,{
                from: buyer4,
                value: amount
            })).to.eventually.be.rejected;
            const nftDetails = await nftmarketplace.tokenData(3);
            assert.equal(nftDetails.status,true,"NFT should remain listed for unsuccessful buy transaction");
            assert.equal(nftDetails.creator,accounts[2],"Creator of NFT shouldn't be changed after buying NFT operation");
            assert.equal(nftDetails.royalty,10,"Royalty of NFT shouldn't be changed after buying NFT operation");
            const balanceOfSender = await erc721.balanceOf(previousOwner)
            assert.equal(1,balanceOfSender.toNumber(),"Balance of previous owner should update successfully")
            const balanceOfReceiver = await erc721.balanceOf(buyer4)
            assert.equal(0,balanceOfReceiver.toNumber(),"Balance of buyer should update successfully")
            const ownerOfNFT = await erc721.ownerOf(3)
            assert.equal(accounts[6],ownerOfNFT,"Owner of received NFT should be buyer")
            const tokenURIofNFT = await erc721.tokenURI(3)
            assert.equal(tokenURIofNFT,"https://ipfs.infura.io/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L3","Transfered token URI should be correct for NFT")
            const totalNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            const total = totalNFTsOnSale.length;
            let count = 0;
            for(let i=0;i<total;i++){
                const tokenId = totalNFTsOnSale[i]
                if(tokenId>0){
                    count++;
                }
            }
            assert.equal(count,2,"Bought NFT should be removed from NFTs on Sale")
            const totalsupply = await erc721.totalSupply()
            assert.equal(totalsupply,3,"Total supply must not be updated after the buying NFT")
        })
    });

    describe("Changing NFT marketplace configurations", async()=>{
        it("Changing service fee by owner of nft marketplace should be successful", async()=>{
            const fee = 5; // in percentages
            const owner = await nftmarketplace.owner(); 
            expect(await nftmarketplace.changeServiceFee(fee,{
                from: owner
            }))
            const changedFee = await nftmarketplace.serviceFee();
            assert.equal(changedFee,5, "Error in changing service fee by owner of nft marketplace");
        })
        it("Changing base uri by owner of nft marketplace should be successful", async()=>{
            const uri = "https://ipfs.infura.io/ipfs/slots/";
            const owner = await nftmarketplace.owner();
            expect(await nftmarketplace.changeBaseURI(uri,{
                from: owner
            }))
            const value = await erc721._baseTokenURI();
            assert.equal(uri,value,"Error in changing base URI by owner of NFT Marketplace contract")
        })
        it("Changing service fee by non-owner of nft marketplace should fail", async()=>{
            const fee = 100; // in percentages
            const nonowner = accounts[9]; 
            expect(nftmarketplace.changeServiceFee(fee,{
                from: nonowner
            })).to.eventually.be.rejected;
            const changedFee = await nftmarketplace.serviceFee();
            assert.notEqual(changedFee.toNumber(),100, "Changing service fee by non-owner of nft marketplace got successful");
        })
        it("Changing base uri by non-owner of nft marketplace should fail", async()=>{
            const uri = "http://ww2.hackers.xyz/media/";
            const nonowner = accounts[9];
            expect(nftmarketplace.changeBaseURI(uri,{
                from: nonowner
            })).to.eventually.be.rejected;
            const value = await erc721._baseTokenURI();
            assert.notEqual(uri,value,"Changing base URI by non-owner of NFT Marketplace contract got successful")
        })
    });

    describe("Updating royalty of NFTs by creators", async()=>{
        it("updating royalty of NFT of token id 1 by creator 1 should be successful", async()=>{
            const tokenId = 1;
            const royalty = 20;
            const creator1 = accounts[1];
            expect(await nftmarketplace.updateRoyaltyOfNFT(tokenId,royalty,{
                from: creator1
            }))
            const nftDetails = await nftmarketplace.tokenData(1);
            assert.equal(nftDetails.royalty,20,"Royalty of NFT of token id 1 should be updated successfully by creator 1");
        })
        it("updating royalty of NFT of token id 2 by creator 1 should be successful", async()=>{
            const tokenId = 2;
            const royalty = 15;
            const creator1 = accounts[1];
            expect(await nftmarketplace.updateRoyaltyOfNFT(tokenId,royalty,{
                from: creator1
            }))
            const nftDetails = await nftmarketplace.tokenData(2);
            assert.equal(nftDetails.royalty,15,"Royalty of NFT of token id 2 should be updated successfully by creator 1");
        })
        it("updating royalty of NFT of token id 2 by current owner should fail", async()=>{
            const tokenId = 2;
            const royalty = 20;
            const currentowner = accounts[3];
            expect(nftmarketplace.updateRoyaltyOfNFT(tokenId,royalty,{
                from: currentowner
            })).to.eventually.be.rejected;
            const nftDetails = await nftmarketplace.tokenData(2);
            assert.notEqual(nftDetails.royalty.toNumber(),20,"Royalty of NFT of token id 2 should fail updating by current owner");
        })
        it("updating royalty of NFT of token id 3 by creator 2 should be successful", async()=>{
            const tokenId = 3;
            const royalty = 30;
            const creator2 = accounts[2];
            expect(await nftmarketplace.updateRoyaltyOfNFT(tokenId,royalty,{
                from: creator2
            }))
            const nftDetails = await nftmarketplace.tokenData(3);
            assert.equal(nftDetails.royalty,30,"Royalty of NFT of token id 3 should be updated successfully by creator 2");
        })
    });

    describe("Testing miscallaneous functionalities",async()=>{
        it("Updating price of NFTs after listing: update price for token Id 2 by buyer-3",async()=>{
            const buyer3 = accounts[6];
            const tokenId = 3;
            const fee = 9000000000000000;
            expect(await nftmarketplace.updatePriceOfNFT(tokenId, fee,{
                from: buyer3
            }))
            const nftDetails = await nftmarketplace.tokenData(3);
            assert.equal(nftDetails.price.toNumber(),fee,"Price updation is unsuccessful");
        })
        it("Deleting/Burning NFTs from marketplace/erc721 contracts: delete NFT of token Id 2", async()=>{
            const tokenId = 3;
            const buyer3 = accounts[6];
            const owner = await erc721.ownerOf(tokenId)
            expect(await nftmarketplace.deleteNFT(tokenId,{
                from: buyer3
            }))
            const myNFTs = await nftmarketplace.getMyItems({
                from: buyer3
            })
            const total = myNFTs.length;
            let flag = true;
            for(var i=0;i<total;i++){
                if(myNFTs[i]==tokenId){
                    flag = false;
                }
            }
            assert.equal(flag,true,"Deletion of token Id 3 is failed")
        })
        it("Unlisting the NFTs from marketplace: should unlist all NFTs which are on sale",async()=>{
            let totalNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            let total = totalNFTsOnSale.length;
            let count = 0;
            for(let i=0;i<total;i++){
                let tokenId = totalNFTsOnSale[i]
                if(tokenId>0){
                    let owner = await erc721.ownerOf(tokenId)
                    expect(await nftmarketplace.unListNFT(tokenId,{
                        from: owner
                    }))
                }
            }
            totalNFTsOnSale = await nftmarketplace.getNFTsOnSale();
            total = totalNFTsOnSale.length;
            for(let i=0;i<total;i++){
                let tokenId = totalNFTsOnSale[i]
                if(tokenId>0){
                    count = count + 1
                }
            }
            assert.equal(count,0,"Unlisting all NFTs failed.")
        })
    })

});