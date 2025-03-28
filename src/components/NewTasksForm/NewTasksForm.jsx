import './NewTasksForm.css'
import { Component, useState } from 'react'
import PropTypes from 'prop-types'

const NewTasksForm = ({ createItem }) => {
  const [label, setLabel] = useState('')

  const onLabelChancge = (e) => setLabel(e.target.value)

  const onAddTask = (e) => {
    createItem(label)
    setLabel('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onAddTask(e)
        }}
      >
        <input
          pattern=".*\S.*"
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          required
          onInput={(e) => onLabelChancge(e)}
          value={label}
        />
      </form>
    </header>
  )
}

NewTasksForm.defaultProps = {
  createItem: () => {},
}
NewTasksForm.PropTypes = {
  createItem: PropTypes.func,
}
export default NewTasksForm
