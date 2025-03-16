import { Component } from 'react'
import { format, addSeconds } from 'date-fns'
import classNames from 'classnames'
import './Task.css'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static defaultProps = {
    onDelete: () => {},
    isDone: () => {},
    editTaskLabel: () => {},
  }
  static propTypes = {
    onDelete: PropTypes.func,
    isDone: PropTypes.func,
    editTaskLabel: PropTypes.func,
  }
  state = {
    isEdit: false,
    isActive: false,
  }

  editTask = () => {
    this.setState(({ isEdit }) => {
      return {
        isEdit: !isEdit,
      }
    })
  }

  timerSwitcher = (e) => {
    if (e.target.className === 'icon icon-play') {
      this.setState({ isActive: true })
    } else if (e.target.className === 'icon icon-pause') {
      this.setState({ isActive: false })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    const { id, label, creationTime, done, timeCounter } = this.props.task
    const classList = classNames({ completed: done, editing: this.state.isEdit })
    let formattedTime = format(addSeconds(new Date(0), timeCounter), 'mm:ss')
    return (
      <li className={classList}>
        <div className="view">
          <input
            id={`doneSwitcher - ${id}`}
            className="toggle"
            type="checkbox"
            checked={done}
            onClick={() => {
              this.props.isDone(id)
              formattedTime = format(addSeconds(new Date(0), 0), 'mm:ss')
              this.props.toStopTimer(id)
            }}
          />
          <label htmlFor={`doneSwitcher - ${id}`}>
            <span className="title">{label}</span>
            <span className="description" onClick={(e) => this.timerSwitcher(e)}>
              <button
                className="icon icon-play"
                onClick={() => {
                  this.props.toStartTimer(id)
                }}
              ></button>
              <button className="icon icon-pause" onClick={() => this.props.toStopTimer(id)}></button>
              {formattedTime}
            </span>
            <span className="created">created {creationTime}</span>
          </label>
          <button className="icon icon-edit" onClick={() => this.editTask()}></button>
          <button
            className="icon icon-destroy"
            onClick={() => {
              this.props.toStopTimer(id)
              this.props.onDelete(id)
            }}
          ></button>
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
