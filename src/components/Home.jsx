import React from "react";
import { Provider } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Mint from '../functions/Mint';
import ImageSlider from '../functions/ImageSlider';
import Balance from '../functions/Balance';
import Reward from '../functions/Reward';
import store from "../redux/store";
import store2 from "../redux/store2";
import store5 from "../redux/store5";
import img from './images/themala.gif';
import img2 from './images/themala.png';
import hiw1 from './images/HIW1.png';
import hiw2 from './images/HIW2.png';
import hiw3 from './images/HIW3.png';
import divider from './images/divider.png';
import product from './images/product.gif';
import Container from 'react-bootstrap/Container';


const slides = [
  { url: "https://i.imgur.com/YiXL345.jpg"},
  { url: "https://i.imgur.com/igA4ikW.jpeg"},
  { url: "https://i.imgur.com/kNdQOdl.png"},  
];



function Home() {
  return (
  <div className="home">
      <h5 style={{textAlign: 'center', backgroundColor: 'white', color: 'red'}}>
        <br></br>
        This is a DEMO operating on the Rinkeby Testnet intended for Desktop use.
        </h5>
        <p style={{textAlign: 'center'}}><i>For those whitelisted as owners, visit the Owner tab to view and claim sales proceeds in real time.</i></p>
      <div >
      <ImageSlider slides={slides} />
      </div>
      <section id="space">
        </section>
      <Container>
      <section id="buy">
          <div>
            <br></br>
            <img src={img} style={{width: "100%"}}/>
          </div>
          <div>
            <br></br>
            <h5 style={{textAlign: 'center'}}><b>TheMala</b> 500g</h5>
            <h5 style={{textAlign: 'center', color: 'red'}}><b>0.001 ETH</b></h5>
            <h6 style={{textAlign: 'center'}}><i>indulge in the full depth of tantalizing MALA</i></h6>
            <br></br>
            TheMala is made using the best-selling recipe for spicy hot pot soup base in Taiwan. We hand-pick our spices and blend them in an umami-rich seaweed base to capture the full depth of Mala flavor. Our masterpiece is packaged as liquid broth, unlike the congealed oil hot pot products from China.
            <br></br>
            <br></br>
            TheMala brings tantalizing experience matched only by the best hot pot establishments in Taiwan -- which is no coincidence, since they use our product to make their soup base!
            <br></br>
            <br></br>
            &nbsp;&nbsp;&nbsp;• No Preservatives
            <br></br>
            &nbsp;&nbsp;&nbsp;• Perfect for a hot pot party of 4 people
            <br></br>
            &nbsp;&nbsp;&nbsp;• Guaranteed to keep you warm during crypto winter
            <br></br>
            <br></br>
            <br></br>
            <Provider store={store}>
            <Mint />
            </Provider>
            <br></br>
          </div>
        </section>
        <br></br>
        <br></br>
        <Row>
          <Col>
          <img src={divider} style={{width: "100%"}}/>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
            <h2 style={{textAlign: 'center'}}><b>HOW IT WORKS</b></h2>
            <br></br>
            In order to purchase the best in packaged hot pot, first connect your wallet and mint a MalaSBT from the MalaSBT smart contract.
            <br></br>
            <br></br>
            <img src={hiw1} class="fat"/>
            <br></br>
            <br></br>
            Each MalaSBT can be used to claim one serving of TheMala. In addition to receiving the branch at a physical address of your choice, you will also receive $MALA loyalty tokens in your wallet.
            <br></br>
            <br></br>
            <br></br>
            <img src={hiw2} class="fat"/>
            <br></br>
            <br></br>
            $MALA can be used to help determine the direction of our brand by suggesting and voting on proposals, such as selling new flavors or potentially adding a noodle combo to our product mix.
            <br></br>
            <br></br>
            <img src={hiw3} class="fat"/>
            <br></br>
            <br></br>
            The MalaSBT will remain in your wallet as a receipt of your purchase. But remember, each MalaSBT can only be used for one claim.
            <br></br>
            <br></br>
            <br></br>
            <img src={divider} style={{width: "100%"}}/>
          </Col>
        </Row>
        <section id="space">
        </section>
        <section id="claim">
          <div>          
              <h5 style={{textAlign: 'center'}}><b>CLAIM YOUR BRANCH</b></h5>
              <p style={{textAlign: 'center'}}><i>To claim your serving of TheMala please do the following</i></p>
              1/ View the index number(s) of the MalaSBT(s) in your wallet.
              <br></br>
              <Provider store={store5}>
              <Balance />
              </Provider>
              <br></br>
              2/ Provide the physical address where you would like to receive your serving of TheMala.
              <br></br>
              <br></br>
              <div style={{textAlign: 'center'}}>
              <b>ADDRESS:</b>&nbsp;&nbsp;
              <input type="text" class="weird" name="Address" />&nbsp;&nbsp;
              <button style={{marginBottom: 5, padding: 5, paddingLeft: 20, paddingRight: 20}}>REGISTER</button>
              </div>
              <br></br>
              3/ To complete the process, click "Claim", then input your index number, and then click "Confirm" to confirm the claim.
              <br></br>
              <br></br>
              <Provider store={store2}>
              <Reward />
              </Provider>
              <br></br>
              Upon completion, you will receive 10 $MALA loyalty tokens in your Web3 wallet -- but remember, each BranchSBT can only initiate one claim!
              <br></br>
          </div>
          <div>
          <img src={img2} style={{width: "100%"}}/>
          <section id="split">
          </section>
          </div>
        </section>
        </Container>
        <section id="space">
        </section>
        
        <center><img src={product} class="ending"/></center>
        <br></br>

    </div>
  );
}

export default Home;
