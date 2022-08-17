import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect3 } from "../redux/blockchain/blockchainActions3";
import store3 from "../redux/store3";



const Withdraw = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [CONFIG, SET_CONFIG] = useState({
    PAYMENT_ADDRESS: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
});


  const wdraw = () => {
    let gasLimit = 285000;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    blockchain.smartContract.methods
      .release(blockchain.account)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.PAYMENT_ADDRESS,
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
        let releasable = await store3
          .getState()
          .blockchain.smartContract.methods.releasable(blockchain.account)
          .call();
        // let cost = await store
        //   .getState()
        //   .blockchain.smartContract.methods.cost()
        //   .call();
  
        dispatch(
          fetchDataSuccess({
            releasable,
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


  const ban = data.releasable;

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
            dispatch(connect3());
            getData();
          }}
        >
          Claim Payments
        </button>
    ) : (
      <>
         <b>Available Balance:</b> <b>{ban/1000000000000000000}</b>
<br></br>
<br></br>

         <button style={{padding: 5, paddingLeft: 20, paddingRight: 20}} onClick={() => {dispatch(wdraw)}}>Release to Owner Account</button>

      </>
    )}

      </div>
  );
}

export default Withdraw;
