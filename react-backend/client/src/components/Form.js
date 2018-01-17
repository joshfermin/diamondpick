import React, { Component } from 'react';

class ApiKeyForm extends React.Component {
   render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.apiKey}
          onChange={this.props.onChangeValue}
        />
        <input
          type="submit"
          value="Submit"
          onClick={this.props.onSubmit}
        />
      </div>
    );
  }
}

export default ApiKeyForm;