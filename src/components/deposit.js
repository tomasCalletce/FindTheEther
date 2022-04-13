import { ethers } from "ethers";
import React from 'react';



import './deposit.css'


export default class DepositBox extends React.Component {

  constructor(props){
      super(props)
      this.state = {
        depositValue : null,
        recipient : '',
        depositButtonClass : 'depositButton'
      }
  }

  async handleClick(){
    this.setState({depositButtonClass:this.state.depositButtonClass.concat(" white")})
    try {
        const contractWithSigner = this.props.contract.connect(this.props.signer);
        await contractWithSigner.deposit(this.state.recipient,{value: ethers.utils.parseEther(this.state.depositValue)})
        console.log(contractWithSigner)
    } catch (error) {
        console.log("err depositing")
        console.log(error)
    }
    
  }

  render(){

    return (
      <div className='depositcontainer'>
          <div className='depositTitlecontainer'>
            <h1 className='depositTitle'>deposit gift</h1>
          </div>
          <input 
            type="text" 
            className='depositField' 
            placeholder='recipient address' 
            onInput={(e)=>this.setState({recipient : e.target.value})}>
          </input>
          <input 
            type="text" 
            className='depositField' 
            placeholder='0.0eth' 
            onInput={(e)=>this.setState({depositValue : e.target.value})}>
          </input>
          
          <button className={this.state.depositButtonClass} onClick={()=>this.handleClick()}>deposit</button>
      </div>
    )
  }

}
