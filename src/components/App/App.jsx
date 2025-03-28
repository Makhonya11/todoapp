import { Component, useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTasksForm from '../NewTasksForm/NewTasksForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')
  const [idNumber, setIdnumber] = useState(100)

  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      return todoData.toSpliced(idx, 1, newItem)
    })
  }

  const createItem = (itemName) => {
    const creatingDate = new Date()
    setIdnumber((idNumber) => idNumber + 1)

    const newItem = {
      creatingDate: creatingDate,
      label: itemName,
      done: false,
      creationTime: formatDistanceToNow(creatingDate, { includeSeconds: true }),
      id: idNumber,
      timeCounter: 0,
      timerId: null,
    }

    setTodoData((todoData) => {
      const newArr = [newItem, ...todoData]
      return newArr
    })

    timer()
  }
  let interval = null
  const timer = () => {
    if (!interval) {
      interval = setInterval(() => {
        setTodoData((todoData) =>
          todoData.map((item) => ({
            ...item,
            creationTime: formatDistanceToNow(item.creatingDate, {
              includeSeconds: true,
            }),
          }))
        )
      }, 5000)
    }
  }

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newData = todoData.toSpliced(idx, 1)

      if (todoData.length === 0) {
        clearInterval(interval)
        interval = null
      }

      return newData
    })
  }

  const clearCompleted = () => {
    setTodoData((todoData) => todoData.filter((el) => !el.done))
  }

  const changeFilter = (items, filter) => {
    switch (filter) {
      case 'All':
        return items
      case 'Active':
        return items.filter((item) => !item.done)
      case 'Completed':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  const onFilterChange = (filter) => setFilter(filter)
  const editTaskLabel = (id, newLabel) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: newLabel }
      return todoData.toSpliced(idx, 1, newItem)
    })
  }

  const toStartTimer = (id) => {
    const timerId = setInterval(() => {
      setTodoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = {
          ...oldItem,
          timeCounter: oldItem.timeCounter + 1,
          timerId: timerId,
        }
        return todoData.toSpliced(idx, 1, newItem)
      })
    }, 1000)
  }

  const toStopTimer = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, timerId: clearInterval(oldItem.timerId) }
      return todoData.toSpliced(idx, 1, newItem)
    })
  }

  const counter = todoData.filter((el) => !el.done).length
  const visibleItems = changeFilter(todoData, filter)
  return (
    <section className="todoapp">
      <NewTasksForm createItem={createItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          editTask={editTaskLabel}
          toStartTimer={toStartTimer}
          toStopTimer={toStopTimer}
        />
        <Footer
          leftItems={counter}
          clearCompleted={clearCompleted}
          filter={changeFilter}
          filterValue={filter}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  )
}

export default App
