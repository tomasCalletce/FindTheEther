import React from 'react';


import './walletConnect.css'


export default class WalletConnect extends React.Component  {

  render(){

    let buttonMessage = "connect wallet"
    if(this.props.state){
      buttonMessage = "..." + String(this.props.wallet).slice(38)
    }

    return (
      <div className='walletConnectContainer'>
         <button className='wallerConnect' onClick={this.props.onClick}>{buttonMessage}</button>
      </div>
    )
  }

}
