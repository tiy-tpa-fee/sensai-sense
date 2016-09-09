import React, { Component } from 'react'

class App extends Component {

  static propTypes = {
    children: React.PropTypes.node
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
