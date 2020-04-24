// React imports
import React, { Component } from 'react';

export default class RouteRedirectionToGame extends Component {

  render() {
    const user = this.props.user;
    const gameSlugname = this.props.match.params.gameSlugname;
    return(
        <React.Fragment>
        <p>{"slugname " + gameSlugname}</p>
        <p>{user ? user.uid : "No user passed"}</p>
        </React.Fragment>
    );
  }
}