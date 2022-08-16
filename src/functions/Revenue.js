import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import store6 from "../redux/store6";


const Revenue = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
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

  const draw = () => {
    let gasLimit = 285000;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    blockchain.smartContract.methods
      .withdraw()
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.BRANCH_SBT_ADDRESS,
        from: blockchain.account,
      })
  };


  const fetchDataRequest = () => {
    return {
      type: "CHECK_DATA_REQUEST",
    };
  };

  const fetchDataSuccess = (payload) => {
    return {
      type: "CHECK_DATA_SUCCESS",
      payload: payload,
    };
  };
  
   const fetchData = () => {
    return async (dispatch) => {
      dispatch(fetchDataRequest());
        let totalSupply = await store6
          .getState()
          .blockchain.smartContract.methods.totalSupply()
          .call();
        // let cost = await store
        //   .getState()
        //   .blockchain.smartContract.methods.cost()
        //   .call();
  
        dispatch(
          fetchDataSuccess({
            totalSupply,
            // cost,
          })
        );
    };
  };

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

  const ban = data.totalSupply;

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

return (
<div>

{blockchain.account === "" ||
    blockchain.smartContract === null ? (
<button style={{padding: 5, paddingLeft: 20, paddingRight: 20}}
onClick={(e) => {
e.preventDefault();
dispatch(connect());
getData();
}}
>
Confirm Owner status to View Sales Performance
</button>
    ) : (

      <>
<u><b>Sales Performance</b></u>
<br></br>
<br></br>
<b>Total MalaSBTs Minted:</b> <b>{ban}</b>
<br></br>
<b>Total Revenue:</b> <b>{ban/1000} ETH</b>
<br></br>
<br></br>


        <button style={{padding: 5, paddingLeft: 20, paddingRight: 20}} onClick={() => {dispatch(draw)}}>Release to Payments</button>


</>
    )}


</div>

);
}

export default Revenue;
