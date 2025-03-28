import { useState, useEffect } from 'react'
import { format, addSeconds } from 'date-fns'
import classNames from 'classnames'
import './Task.css'
import PropTypes from 'prop-types'

const Task = ({ task, isDone, toStopTimer, toStartTimer, onDelete, editTaskLabel }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const editTask = () => setIsEdit(!isEdit)

  const timerSwitcher = (e) => {
    if (e.target.className === 'icon icon-play') setIsActive(true)
    if (e.target.className === 'icon icon-pause') setIsActive(false)
  }

  /*useEffect(() => {
    return () => clearInterval(timerId);
  });*/

  const { id, label, creationTime, done, timeCounter, timerId } = task
  const classList = classNames({
    completed: done,
    editing: isEdit,
  })
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
            isDone(id)
            formattedTime = format(addSeconds(new Date(0), 0), 'mm:ss')
            toStopTimer(id)
          }}
        />
        <label htmlFor={`doneSwitcher - ${id}`}>
          <span className="title">{label}</span>
          <span className="description" onClick={(e) => timerSwitcher(e)}>
            <button
              className="icon icon-play"
              onClick={() => {
                if (!isActive) toStartTimer(id)
                return
              }}
            ></button>
            <button className="icon icon-pause" onClick={() => toStopTimer(id)}></button>
            {formattedTime}
          </span>
          <span className="created">created {creationTime}</span>
        </label>
        <button className="icon icon-edit" onClick={() => editTask()}></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            toStopTimer(id)
            onDelete(id)
          }}
        ></button>
      </div>
      {isEdit && (
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.code === 'NumpadEnter') {
              if (e.target.value.trim().length > 0) {
                editTask()
                editTaskLabel(id, e.target.value)
              }
            }
          }}
        />
      )}
    </li>
  )
}

Task.defaultProps = {
  onDelete: () => {},
  isDone: () => {},
  editTaskLabel: () => {},
}
Task.PropTypes = {
  onDelete: PropTypes.func,
  isDone: PropTypes.func,
  editTaskLabel: PropTypes.func,
}
export default Task
