import React, { Component } from 'react'
import { Link } from 'react-router'

class Leaderboard extends Component {
  render () {
    const scoreArray = JSON.parse(window.localStorage.getItem('scoreArray'))
    scoreArray.sort((a, b) => a.guesses - b.guesses)
    console.log(scoreArray)
    return <div className='leader'>
      <h2>Leaderboard</h2>
      <h3>LEAST GUESSES</h3>
        {scoreArray.map((score, i) => <div className='scores' key={i}>{score.player}: {score.guesses}</div>)}
      <h3>MOST GUESSES</h3>
      <button className='title-return'><Link to='/'>Return to Title</Link></button>
    </div>
  }
}
export default Leaderboard
