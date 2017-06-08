import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    return (
      <div>
        User list :
        <ul>
          {
            this.props.users.map(function(user){
              return <li>{user.pseudo} ({user.points} points)</li>;
            })
          }
        </ul>
      </div>
    );
  }
}
