import { createRoot } from 'react-dom/client'
import './NewTasksForm.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTasksForm extends Component {
  static defaultProps = {
    createItem: () => {},
  }
  static propTypes = {
    createItem: PropTypes.func,
  }
  state = {
    label: '',
  }
  onLabelChancge = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onAddTask = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (this.state.label.trim().length > 0) {
        this.props.createItem(this.state.label)
        this.setState({
          label: '',
        })
      }
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onInput={(e) => this.onLabelChancge(e)}
          onKeyDown={(e) => this.onAddTask(e)}
          value={this.state.label}
        />
      </header>
    )
  }
}
