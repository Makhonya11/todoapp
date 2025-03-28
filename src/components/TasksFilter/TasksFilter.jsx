import './TasksFilter.css'
import { Component } from 'react'
import PropTypes from 'prop-types'
const TasksFilter = ({ filterValue, onFilterChange, filter }) => {
  const buttonsName = ['All', 'Active', 'Completed']

  const buttons = buttonsName.map((button) => {
    const isActive = button === filterValue
    const className = isActive ? 'selected' : ''
    return (
      <li key={button}>
        <button className={className} onClick={() => onFilterChange(button)}>
          {button}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}
TasksFilter.defaultProps = {
  onFilterChange: () => {},
  filterValue: 'All',
}
TasksFilter.PropTypes = {
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
}

export default TasksFilter
