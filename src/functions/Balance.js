import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect5 } from "../redux/blockchain/blockchainActions5";
import store7 from "../redux/store7";


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
        let balanceOf = await store7
          .getState()
          .blockchain.smartContract.methods.balanceOf(blockchain.account)
          .call();
        // let cost = await store
        //   .getState()
        //   .blockchain.smartContract.methods.cost()
        //   .call();
  
        dispatch(
          fetchDataSuccess({
            balanceOf,
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



  const kan = data.balanceOf;

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

return (
  <div style={{textAlign: 'center'}}>
  <b>SBTs Minted: </b>
{blockchain.account === "" ||
    blockchain.smartContract === null ? (
<button style={{padding: 5, paddingLeft: 20, paddingRight: 20}}
onClick={() => {dispatch(connect5())}}>
View
</button>
       ) : (
        <>
<b>{kan}</b>
</>

)}
            {blockchain.errorMsg !== "" ? (
          <>

              <p style={{textAlign: 'center', color: 'red'}}><b> {blockchain.errorMsg}</b></p>
          </>
        ) : null}

</div>

);
}

export default Balance;
