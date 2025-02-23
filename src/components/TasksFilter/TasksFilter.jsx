import { createRoot } from 'react-dom/client'
import './TasksFilter.css'
import { Component } from 'react'
import PropTypes from 'prop-types'
export default class TasksFilter extends Component {
  static defaultProps = {
    onFilterChange: () => {},
    filterValue: 'All',
  }
  static propTypes = {
    filterValue: PropTypes.string,
    onFilterChange: PropTypes.func,
  }
  buttons = ['All', 'Active', 'Completed']
  render() {
    const { filterValue, onFilterChange, filter } = this.props
    const buttons = this.buttons.map((button) => {
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
}
