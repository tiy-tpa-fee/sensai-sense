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
    let scores = window.localStorage.scoreArray ? JSON.parse(window.localStorage.getItem('scoreArray')) : []
    this.state = {
      id: 0,
      moves: [],
      currentMove: [],
      won: false,
      numGuesses: 0,
      leaderScores: scores
    }
  }

  componentWillMount () {
    console.log(this.state.leaderScores, window.localStorage.scoreArray)
    window.fetch(`${GAME_URL}games?${TOKEN}`, { method: 'POST' })
    .then(resp => resp.json())
    .then(json => this.setState({
      id: json.id,
      moves: json.moves
    }))
  }

  receiveColor = (color, index) => {
    const currMove = this.state.currentMove.slice()
    currMove[index] = color
    this.setState({
      currentMove: currMove
    })
  }

  makeMove = () => {
    this.setState({numGuesses: this.state.numGuesses + 1})
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
      const matches = moves[moves.length - 1].result.filter((result) => result === 'exact_match')
      if (matches.length === 4) {
        let currScore = this.state.leaderScores.slice()
        currScore.push(this.state.numGuesses)
        this.setState({
          won: true,
          leaderScores: currScore
        }, () => {
          let newScores = JSON.stringify(this.state.leaderScores)
          window.localStorage.setItem('scoreArray', newScores)
        })
      }
    }))
  }
  reset () {
    window.location.reload()
  }
  render () {
    const { moves, currentMove, won } = this.state
    return <div className='game'>
      <div className='score'><p>Guesses: {this.state.numGuesses}</p></div>
      <div className={`modal-${won}`}>
        <h2>YOU WIN!</h2>
        <button className='reset' onClick={this.reset}>PLAY AGAIN</button>
      </div>
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
