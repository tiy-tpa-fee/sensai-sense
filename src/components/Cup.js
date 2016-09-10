import React, { Component } from 'react'
import cx from 'classnames'

class Cup extends Component {
  static propTypes = {
    color: React.PropTypes.string,
    droppable: React.PropTypes.bool,
    passColor: React.PropTypes.func,
    index: React.PropTypes.number
  }

  constructor (props) {
    super(props)
    this.state = {
      color: this.props.color,
      highlight: false
    }
  }

  _handleDragEnter = (event) => {
    this.setState({
      highlight: true
    })
  }

  _handleDragLeave = (event) => {
    this.setState({
      highlight: false
    })
  }

  _handleDragOver = (event) => {
    // Preventing the default is required to allow
    // drop event to occur.
    event.preventDefault()
  }

  _handleDrop = (event) => {
    const color = event.dataTransfer.getData('text/plain')
    this.setState({
      highlight: false,
      color: color
    }, () => {
      this.props.passColor(this.state.color, this.props.index)
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({color: nextProps.color})
  }

  render () {
    let color, front
    if (this.state.color) {
      color = <div className={cx('color', this.state.color)} />
    }
    if (this.props.droppable) {
      front = <div
        className='front'
        onDragEnter={this._handleDragEnter}
        onDragLeave={this._handleDragLeave}
        onDragOver={this._handleDragOver}
        onDrop={this._handleDrop}
      />
    } else {
      front = <div className='front' />
    }

    return <div className={cx('cup', { highlight: this.state.highlight })}>
      {color}
      {front}
    </div>
  }
}
export default Cup
