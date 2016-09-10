import React, { Component } from 'react'
import Cup from './Cup'
import Well from './Well'
const GAME_URL = 'https://sensei-sense-api.herokuapp.com/'
const TOKEN = 'access_token=brett'
const CUPS = [0, 1, 2, 3]
const COLORS = ['green', 'aqua', 'fuschia', 'blueberry', 'fire', 'coal']

class Game extends Component {
  constructor () {
    super()
    this.state = {
      id: 0,
      moves: [],
      currentMove: []
    }
  }

  componentWillMount () {
    window.fetch(`${GAME_URL}games?${TOKEN}`, { method: 'POST' })
    .then(resp => resp.json())
    .then(json => this.setState({
      id: json.id,
      moves: json.moves
    }))
  }

  receiveColor = (color, index) => {
    const currMove = this.state.currentMove
    currMove[index] = color
    this.setState({
      currentMove: currMove
    })
  }

  makeMove = () => {
    window.fetch(`${GAME_URL}games/move?${TOKEN}&game_id=${this.state.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guess: this.state.currentMove
      })
    })
    .then(resp => resp.json())
    .then(json => this.setState({
      moves: json.moves,
      currentMove: []
    }, () => {
      const { moves } = this.state
      let last = moves.length - 1
      console.log(last, moves, moves[last])
      const matches = moves[last].result.filter((result) => result === 'exact_match')
      console.log('Matches', matches)
      if (matches.length === 4) { window.alert('You Win') }
    }))
  }

  render () {
    const { moves, currentMove } = this.state
    return <div className='game'>
      <div className='previous'>
      {moves.map((prevTurn, i) => {
        return <div className='turn' key={i}>
          {prevTurn.guess.map((guess, j) =>
            <Cup color={guess} key={j} />)}
          <div className='pegs'>
            {prevTurn.result.map((result, k) => {
              return <div className={result} key={k} />
            })}
          </div>
        </div> })}
      </div>
      <div className='current turn'>
        {CUPS.map((cup, i) =>
          <Cup
            droppable
            index={i}
            passColor={this.receiveColor}
            color={currentMove[i]}
            key={i} />)}
        <div className='go'>
          <button onClick={this.makeMove}>Confirm Move</button>
        </div>
      </div>
      <div className='color-well'>
        {COLORS.map((color, i) => <Well color={color} key={i} />)}
      </div>
    </div>
  }
}
export default Game
