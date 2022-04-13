import React from 'react';
import './App.css';
import { ethers } from "ethers";
import GetTheEther from './artifacts/contracts/GetTheEther.sol/GetTheEther.json'


// components 
import DepositBox from './components/deposit'
import WalletConnect from './components/walletConnect'
import InfoTile from './components/infoTile'

const GetTheEtherAdress = '0x581e4dc374645EC4b920452Edbba167bB97bC6C3';
let network = 'ropsten'


const infoTiles = [
  {
    title: "1 create or make recipient private key",
    description : "Use this website to create a new private key. You will have to send this private key to your friend."
  },
  {
    title: "2 copy and paste address of recipient",
    description : "Copy and paste the address from the private key we just created into the recipient field of the deposit box. Then add input the amount of either you want to lock inside the smart contract."
  },
  {
    title: "3 lock the ether",
    description : "Once you press deposit and accept the transaction inside of metamask the only way to retrieve the money is to call the withdrawal function the get the ether smart contract from the private key we just created and you will give it to your friend. Don't tell him how!"
  }

]


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      wallet : "",
      walletConnected : false,
      provider : null,
      signer : null,
      GetTheEtherContract : null
    }
  }


  async requestAccount(provider) {
    if(window.ethereum) {
      try {
        const accounts = await provider.send("eth_requestAccounts", [])
        this.setState({wallet:accounts[0]})
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      alert('Meta Mask not detected');
    }
  }

  async connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await this.requestAccount(provider)
      const signer = provider.getSigner()
      const GetTheEtherContract  = new ethers.Contract(GetTheEtherAdress,GetTheEther.abi,provider)
      this.setState({provider:provider,walletConnected:true,signer:signer,GetTheEtherContract:GetTheEtherContract})
    }
  }

  render(){

    return (
      <div className='appContainer'>

        <div className='header'>
          <div className='headerTitleContainer'>
            <h1 className='headerTitle'>Get The Ether</h1>
          </div>
          <WalletConnect onClick={()=>this.connectWallet()} state={this.state.walletConnected} wallet={this.state.wallet} />
        </div>

        <DepositBox contract={this.state.GetTheEtherContract} signer={this.state.signer}/>

        <div className='footer'>
          <InfoTile text={infoTiles[0]}/>
          <InfoTile text={infoTiles[1]}/>
          <InfoTile text={infoTiles[2]}/>
        </div>
        <div>
          <p>made by tom 🍭 | contract: 0x581e4dc374645EC4b920452Edbba167bB97bC6C3 (Ropsten test network)</p>
        </div>

      </div>
    )
  }

}
