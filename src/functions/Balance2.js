import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect4 } from "../redux/blockchain/blockchainActions4";
import store5 from "../redux/store5";


const Balance2 = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [CONFIG, SET_CONFIG] = useState({
    TOKEN_ADDRESS: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
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
        let hasClaimed = await store5
          .getState()
          .blockchain.smartContract.methods.hasClaimed(blockchain.account)
          .call();
        // let cost = await store
        //   .getState()
        //   .blockchain.smartContract.methods.cost()
        //   .call();
  
        dispatch(
          fetchDataSuccess({
            hasClaimed,
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



  const lan = data.hasClaimed;

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

return (
  <div style={{textAlign: 'center'}}>
  <b>SBTs Claimed: </b>
{blockchain.account === "" ||
    blockchain.smartContract === null ? (
<button style={{padding: 5, paddingLeft: 20, paddingRight: 20}}
onClick={() => {dispatch(connect4())}}>
View
</button>
       ) : (
        <>
<b>{lan}</b>
</>

)}
            {blockchain.errorMsg !== "" ? (
          <>
          <br></br>
          <br></br>

              <p style={{textAlign: 'center', color: 'red'}}><b> {blockchain.errorMsg}</b></p>
          </>
        ) : null}

</div>

);
}

export default Balance2;
