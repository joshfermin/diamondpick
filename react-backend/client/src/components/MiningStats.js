import React, { Component } from 'react';
import ApiKeyForm from './Form';
import TwoLevelPieChart from './TwoLevelPieChart';

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
    fetch('/miningstats/usdbalances?api_key=' + this.state.apiKey)
      .then(res => res.json())
      .then(balances => {
        this.setState({ balances })
      });
  }

  render() {
    return (
      <div>
        <h1>diamondpick</h1>

        <ApiKeyForm
        	value={this.state.apiKey}
        	onChangeValue={this.handleChangeValue}
        	onSubmit={this.handleSubmit}
		/>

		<TwoLevelPieChart balances={this.state.balances}/>
      </div>
    );
  }
}

export default MiningStats;