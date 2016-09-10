import React from 'react'
import { Link } from 'react-router'

export default () => {
  return <div className='title'>
    <h2>Welcome to Sensei-Sense!</h2>
    <h3>A Mimic of Mastermind&trade;</h3>

    <p>When you press play, you will be transported to the world of Sensei-Sense, a game of skill, cunning and wit. </p>
    <p>You will be presented with 6 fiery jewels of different hues. Hidden from your view are 4 jewels selected by the Sacred Samurai and placed within vessels in a specific order which you must guess.</p>
    <p>In each turn, you will select 4 jewels (they can be repeated) and place them in the vessels and press the stone that says "CONFIRM MOVE" to to begin your turn.</p>
    <p>When you have confirmed your move, the Sacred Samurai will reveal via different tokens whether you have made any correct selections, either in color or position.</p>
    <p>A <span className='red'>RED TOKEN<div className='small-red-tag' /></span> means that one of the jewels' color is correct, but in the wrong position. A <span className='white'>WHITE TOKEN<div className='small-white-tag' /></span> means that one of the jewels is both the correct hue and at the correct position.</p>
    <p>When you have all <span className='white'>WHITE TOKENS</span> you have won the game!</p>

    <button className='play-button'><Link to='/game'>PLAY!</Link></button>
  </div>
}
