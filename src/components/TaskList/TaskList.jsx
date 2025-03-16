import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleDone, editTask, toStartTimer, toStopTimer }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          task={todo}
          onDelete={onDeleted}
          isDone={onToggleDone}
          editTaskLabel={editTask}
          toStartTimer={toStartTimer}
          toStopTimer={toStopTimer}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
}
export default TaskList
