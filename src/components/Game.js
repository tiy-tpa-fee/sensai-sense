import React from 'react'

import { Cup, Well } from '.'

class Game extends React.Component {
  constructor () {
    super()
    this.state = {
      currentMove: [],
      moves: []
    }
  }

  componentDidMount () {
    window.fetch(`https://sensei-sense-api.herokuapp.com/games?access_token=pickles`, {
      method: 'POST'
    }).then((response) => response.json())
    .then((data) => {
      this.setState({
        id: data.id,
        moves: data.moves
      })
    })
  }

  _submitTurn = () => {
    window.fetch(`https://sensei-sense-api.herokuapp.com/games/move?access_token=pickles&game_id=${this.state.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guess: this.state.currentMove
      })
    }).then((response) => response.json())
    .then((data) => {
      this.setState({
        moves: data.moves,
        currentMove: []
      })
    })
  }

  _setColor = (color, id) => {
    let move = this.state.currentMove.slice()
    move[id] = color
    this.setState({
      currentMove: move
    })
  }

  render () {
    const turns = this.state.moves.map((move, index) => {
      return <div className='turn' key={index}>
        <Cup color={move.guess[0]} />
        <Cup color={move.guess[1]} />
        <Cup color={move.guess[2]} />
        <Cup color={move.guess[3]} />
        <div className='pegs'>
          <div className={move.result[0]} />
          <div className={move.result[1]} />
          <div className={move.result[2]} />
          <div className={move.result[3]} />
        </div>
      </div>
    })
    return <div className='game'>
      <div className='previous'>
        {turns}
      </div>
      <div className='current turn'>
        <Cup droppable id={0} setColor={this._setColor} color={this.state.currentMove[0]} />
        <Cup droppable id={1} setColor={this._setColor} color={this.state.currentMove[1]} />
        <Cup droppable id={2} setColor={this._setColor} color={this.state.currentMove[2]} />
        <Cup droppable id={3} setColor={this._setColor} color={this.state.currentMove[3]} />
        <div className='go'>
          <button onClick={this._submitTurn}>Go</button>
        </div>
      </div>
      <div className='color-well'>
        <Well color='green' />
        <Well color='aqua' />
        <Well color='fuschia' />
        <Well color='blueberry' />
        <Well color='fire' />
        <Well color='coal' />
      </div>
    </div>
  }
}

export default Game
