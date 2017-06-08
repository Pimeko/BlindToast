import React, { Component } from 'react';

export default class Users extends Component {
  constructor(props) {
    super(props);

    var list = props.users;
    var newList = [];

    for (const key of Object.keys(list)) {
      const currObj = list[key];
      newList.push(currObj);
    }
    this.state = {
      list: newList
    }
  }

  componentWillReceiveProps(nextProps) {
    var list = nextProps.users;
    var newList = [];

    for (const key of Object.keys(list)) {
      const currObj = list[key];
      newList.push(currObj);
    }
    this.setState({
      list: newList
    });
  }

  render() {
    return (
      <div>
        User list :
        <ul>
          {
            this.state.list.map(function(obj){
              return <li>{obj.pseudo} ({obj.points} points)</li>;
            })
          }
        </ul>
      </div>
    );
  }
}
