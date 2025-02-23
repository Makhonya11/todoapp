import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'
const Footer = ({ leftItems = 0, filter, onFilterChange, filterValue, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{leftItems} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} filterValue={filterValue} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.propTypes = {
  leftItems: PropTypes.number,
}

export default Footer
