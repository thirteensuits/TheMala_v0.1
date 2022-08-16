import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import store5 from "../redux/store5";


const Balance = () => {
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
        let walletOfOwner = await store5
          .getState()
          .blockchain.smartContract.methods.walletOfOwner(blockchain.account)
          .call();
        // let cost = await store
        //   .getState()
        //   .blockchain.smartContract.methods.cost()
        //   .call();
  
        dispatch(
          fetchDataSuccess({
            walletOfOwner,
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

  const ban = data.walletOfOwner;
  const tan = ban.map((number) =>
  <li>{number}</li>
);




  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

return (
  <div style={{textAlign: 'center'}}>
  <br></br>
{blockchain.account === "" ||
    blockchain.smartContract === null ? (
<button style={{padding: 5, paddingLeft: 20, paddingRight: 20}}
onClick={(e) => {
e.preventDefault();
dispatch(connect());
getData();
}}
>
VIEW
</button>
       ) : (
        <>
<b>MalaSBT Index Number:</b>  {tan}
</>

)}

</div>

);
}

export default Balance;
