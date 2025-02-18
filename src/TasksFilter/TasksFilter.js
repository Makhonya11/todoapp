import { createRoot } from 'react-dom/client'
import './TasksFilter.css'
import { Component } from 'react'
import PropTypes from 'prop-types'
export default class TasksFilter extends Component {
  static defaultProps = {
    onFilterChange: () => {},
    filterValue: 'all',
  }
  static propTypes = {
    filterValue: PropTypes.string,
    onFilterChange: PropTypes.func,
  }
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ]
  render() {
    const { filterValue, onFilterChange, filter } = this.props
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = name === filterValue
      const className = isActive ? 'selected' : ''
      return (
        <li key={name}>
          <button className={className} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}
