import React from 'react';

import games from '../../../games/games'

let Shelf = React.createClass({
  chooseGame(gamename){
    this.props.chooseGame(games[gamename]);
  },
  render() {
    let choices = Object.keys(games).map((g,n)=> <button key={n} onClick={this.chooseGame.bind(this,g)}>{g}</button>)
    return <div>{choices}</div>;
  }
})

export default Shelf;