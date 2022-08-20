import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect2 } from "../redux/blockchain/blockchainActions2";
import { fetchData } from "../redux/data/dataActions";

const Reward = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [CONFIG, SET_CONFIG] = useState({
    TOKEN_ADDRESS: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
  });

  const claimNFTs = () => {
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .claim()
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.TOKEN_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Try again please!!");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback("Success!! Congratulations on your claim.");
        setClaimingNft(false);
      });
  };

  const [mintAmount, setMintAmount] = useState(1);

  const handleInput = (e) => setMintAmount(e.currentTarget.value);

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
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

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <div style={{textAlign: 'center'}}>

                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <button style={{padding: 5, paddingLeft: 20, paddingRight: 20}}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect2());
                        getData();
                      }}
                    >
                      Claim
                    </button>
                ) : (
                  <>
                     <button style={{padding: 5, paddingLeft: 20, paddingRight: 20}}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "Claiming..." : "Confirm"}
                      </button>
                  </>
                )}

          <br></br>
          <br></br>
          <p style={{textAlign: 'center', color: 'red'}}><b>{feedback}</b></p>

          {blockchain.errorMsg !== "" ? (
          <>

              <p style={{textAlign: 'center', color: 'red'}}><b> {blockchain.errorMsg}</b></p>
          </>
        ) : null}
      </div>
  );
}

export default Reward;
