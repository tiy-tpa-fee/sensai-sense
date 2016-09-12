import React, { Component } from 'react'
import '../styles/screen.sass'

class App extends Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render () {
    return <div className='app'>
      <header>
        <h1>Sensei Sense</h1>
      </header>
      <main>
        {this.props.children}
      </main>
      <footer>
        Copyright &copy; 2016 Pickles of Awesome, All Rights Reserved.
      </footer>
    </div>
  }
}

export default App
