import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    return (
      <div className="classement">
        <div className="grey_title">CLASSEMENT</div>
          <div className="classement_container">
            <ul>
              {
                this.props.users.map((user, index) => {
                  var li_first = index === 0 ? "li_first" : "";
                  var li_second = index === 1 ? "li_second" : "";
                  var li_auth = user.pseudo === this.props.authUserPseudo ? "li_auth" : "";

                  return <li className={li_first +  " " + li_second + " " + li_auth}>
                      {user.pseudo} <span className="user_score">{user.points}</span>
                    </li>
                  ;
                })
              }
            </ul>
          </div>
      </div>
    );
  }
}
