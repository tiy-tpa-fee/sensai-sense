import React from 'react'

import { Cup, Well } from '.'

class Game extends React.Component {

  constructor () {
    super()
    this.state = {
      currentMove: []
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
        id: data.id,
        moves: data.moves
      })
    })
  }

  render () {
    return <div className='game'>
      <div className='previous'>
        <div className='turn'>
          <Cup color='aqua' />
          <Cup />
          <Cup />
          <Cup />
          <div className='pegs'>
            TODO
          </div>
        </div>
      </div>
      <div className='current turn'>
        <Cup droppable />
        <Cup droppable />
        <Cup droppable />
        <Cup droppable />
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
