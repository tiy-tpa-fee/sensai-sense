import React from 'react'

import { Cup, Well } from '.'

class Game extends React.Component {

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
          <button>Go</button>
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
