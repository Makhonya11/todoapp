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
    this.props.createItem(this.state.label)
    this.setState({
      label: '',
    })
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.onAddTask(e)
          }}
        >
          <input
            pattern=".*\S.*"
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            required
            onInput={(e) => this.onLabelChancge(e)}
            value={this.state.label}
          />
        </form>
      </header>
    )
  }
}
