import React, { Component } from 'react';

export default class Users extends Component {
  constructor(props) {
    super(props);
    console.log("props user : ", props.users)
  }

  render() {
    return (
      <div>
        User list :
        <ul>
          <li>{this.props.users}</li>
        </ul>
      </div>
    );
  }
}
