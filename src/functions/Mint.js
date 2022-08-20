import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";

const Mint = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [CONFIG, SET_CONFIG] = useState({
    BRANCH_SBT_ADDRESS: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = 1000000000000000;
    let gasLimit = 285000;
    let totalCostWei = String(cost);
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, 1)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.BRANCH_SBT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Try again please!!");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback("Success!! Congratulations on your purchase.");
        setClaimingNft(false);
      });
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);



  return (
      <div style={{textAlign: 'center'}}>
        {blockchain.account === "" ||
    blockchain.smartContract === null ? (
        <button style={{padding: 5, paddingLeft: 20, paddingRight: 20}} onClick={() => {dispatch(connect())}}>Connect your Wallet to Purchase TheMala</button>
        ) : (
          <>

        <button style={{padding: 5, paddingLeft: 20, paddingRight: 20}} onClick={() => {dispatch(claimNFTs)}}>{claimingNft ? "Purchasing..." : "Purchase TheMala!!"}</button>
        </>
    )}
          <br></br>
          <br></br>
              <p style={{textAlign: 'center', color: 'red'}}><b>{feedback}</b></p>
            {blockchain.errorMsg !== "" ? (
          <>
          <p style={{textAlign: 'center', color: 'red'}}><b>{blockchain.errorMsg}</b></p>
          </>
        ) : null}

      </div>
  );
}

export default Mint;
