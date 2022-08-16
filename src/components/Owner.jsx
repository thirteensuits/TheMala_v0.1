import React from "react";
import { Provider } from "react-redux";
import Revenue from '../functions/Revenue';
import Withdraw from '../functions/Withdraw';
import store6 from "../redux/store6";
import store3 from "../redux/store3";


function Owner() {

  return (
    <div className="owner">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-0">
          <h1 class="font-weight-bold">Owner</h1>
            <br></br>
            <p>
              This area is for Owners -- i.e. those who own a TrunkNFT (eventually we want to build a token-gate)
            <br></br>
            <br></br>
              Owners can check the financial performance of Branch sales (volume and revenue) in real time,
              <br></br>
              and can also claim their share of the cash flow in real time.
              <br></br>
              <br></br>
              The process works as such:
              <br></br>
              &nbsp;&nbsp;1/ view total ETH balance from BranchSBT sales in the BranchSBT contract;
              <br></br>
              &nbsp;&nbsp;2/ release ETH from BranchSBT contract to the Payments contract;
              <br></br>
              &nbsp;&nbsp;3/ release ETH payable to Owner from Payments contract to the Owner's wallet. 
              <br></br>
              <b>The functions in this process can only be executed by Owners.</b>
              <br></br>
              <br></br>
              <br></br>
              <Provider store={store6}>
              <Revenue />
              </Provider>
              <br></br>
              <br></br>
              <Provider store={store3}>
              <Withdraw />
              </Provider>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Owner;
