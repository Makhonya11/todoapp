import { createRoot } from 'react-dom/client'
import PropTypes from 'prop-types'
import { Component } from 'react'

import Task from '../Task/Task'

import './TaskList.css'

export default class TaskList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
  }
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map((todo) => (
          <Task
            key={todo.id}
            task={todo}
            onDelete={this.props.onDeleted}
            isDone={this.props.onToggleDone}
            addItem={this.props.createItem}
            editTaskLabel={this.props.editTask}
          />
        ))}
      </ul>
    )
  }
}
