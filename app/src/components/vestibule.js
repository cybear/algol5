import React from 'react';

import Battle from './battle'

let Vestibule = React.createClass({
  componentWillMount() {
    this.opts = [{type:"human",name:"Human"}].concat(this.props.game.AI.map(n=>({name:n,type:"ai"})))
  },
  componentDidMount() {
    this.select('plr1',this.opts[0])
    this.select('plr2',this.opts[0])
  },
  getInitialState() {
    return {plr1:0,plr2:0};
  },
  select(who,what) {
    this.setState({[who]:what})
  },
  start(){
    this.props.selectParticipants(this.state.plr1,this.state.plr2)
  },
  render() {
    let game = this.props.game
    let plr1opts = this.opts.map((o,n)=> <button key={n} onClick={this.select.bind(this,'plr1',o)}>{o.name}</button>)
    let plr2opts = this.opts.map((o,n)=> <button key={n} onClick={this.select.bind(this,'plr2',o)}>{o.name}</button>)
    return <div>
      <p>Plr1 is {this.state.plr1.name}: {plr1opts}</p>
      <p>Plr2 is {this.state.plr2.name}: {plr2opts}</p>
      <button onClick={this.start}>Start game!</button>
    </div>
  }
})

export default Vestibule;
