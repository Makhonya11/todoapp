import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleDone, editTask }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task key={todo.id} task={todo} onDelete={onDeleted} isDone={onToggleDone} editTaskLabel={editTask} />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
}
export default TaskList
