import React, { Component } from 'react';
import ApiKeyForm from './Form';

class MiningStats extends Component {
  constructor(props) {
  	super(props);
	this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	
	this.state = {apiKey: '', balances: []};
  }
  
  handleChangeValue(e){
  	this.setState({apiKey: e.target.value}); 	
  } 
  
  handleSubmit(){
  	console.log(this.state.apiKey);
    fetch('/miningstats/userbalances?api_key=' + this.state.apiKey)
      .then(res => res.json())
      .then(balances => {
        console.log(balances);
        balances = balances.getuserallbalances.data;
        this.setState({ balances })
      });
  }

  render() {
    return (
      <div>
        <h1>Coins</h1>

        <ApiKeyForm
        	value={this.state.apiKey}
        	onChangeValue={this.handleChangeValue}
        	onSubmit={this.handleSubmit}
		/>

        {this.state.balances.map(coin =>
          <div>{coin.coin} - {coin.confirmed}</div>
        )}
      </div>
    );
  }
}

export default MiningStats;