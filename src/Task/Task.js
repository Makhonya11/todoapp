import { createRoot } from 'react-dom/client'
import { Component } from 'react'
import './Task.css'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static defaultProps = {
    onDelete: () => {},
    isDone: () => {},
    addItem: () => {},
    editTaskLabel: () => {},
  }
  static propTypes = {
    onDelete: PropTypes.func,
    isDone: PropTypes.func,
    addItem: PropTypes.func,
    editTaskLabel: PropTypes.func,
  }
  state = {
    isEdit: false,
  }

  editTask = () => {
    this.setState(({ isEdit }) => {
      return {
        isEdit: !isEdit,
      }
    })
  }

  render() {
    const { id, label, creationTime, done } = this.props.task

    return (
      <li className={done ? 'completed' : this.state.isEdit ? 'editing' : ''}>
        <div className="view">
          <input
            onClick={() => this.props.isDone(id)}
            className="toggle"
            type="checkbox"
            checked={done ? true : false}
          />
          <label onClick={() => this.props.isDone(id)}>
            <span className="description">{label}</span>
            <span className="created">created {creationTime}</span>
          </label>
          <button className="icon icon-edit" onClick={() => this.editTask()}></button>
          <button className="icon icon-destroy" onClick={() => this.props.onDelete(id)}></button>
        </div>
        {this.state.isEdit && (
          <input
            type="text"
            className="edit"
            defaultValue={label}
            onKeyDown={(e) => {
              if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                if (e.target.value.trim().length > 0) {
                  this.editTask()
                  this.props.editTaskLabel(id, e.target.value)
                }
              }
            }}
          />
        )}
      </li>
    )
  }
}
