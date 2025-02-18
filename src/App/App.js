import { createRoot } from 'react-dom/client'
import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTasksForm from '../NewTasksForm/NewTasksForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import TasksFilter from '../TasksFilter/TasksFilter'

import './App.css'

export default class App extends Component {
  idNumber = 100
  state = {
    todoData: [],
    filter: 'all',
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newData = todoData.toSpliced(idx, 1)
      //console.log(newData)

      return {
        todoData: newData,
      }
    })
  }
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      return {
        todoData: todoData.toSpliced(idx, 1, newItem),
      }
    })
  }

  createItem = (itemName) => {
    const creatingDate = new Date()

    const newItem = {
      label: itemName,
      done: false,
      creationTime: formatDistanceToNow(creatingDate, { includeSeconds: true }),
      id: this.idNumber++,
    }

    this.setState(({ todoData }) => {
      const newArr = [newItem, ...todoData]

      return {
        todoData: newArr,
      }
    })
    const interval = setInterval(() => {
      this.setState(({ todoData }) => {
        return {
          todoData: todoData.map((item) =>
            item.id === newItem.id
              ? { ...item, creationTime: formatDistanceToNow(creatingDate, { includeSeconds: true }) }
              : item
          ),
        }
      })
    }, 20000)
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => !el.done),
      }
    })
  }

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }
  editTaskLabel = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: newLabel }
      return {
        todoData: todoData.toSpliced(idx, 1, newItem),
      }
    })
  }
  render() {
    const counter = this.state.todoData.filter((el) => !el.done).length
    const visibleItems = this.filter(this.state.todoData, this.state.filter)
    return (
      <section className="todoapp">
        <NewTasksForm createItem={this.createItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            editTask={this.editTaskLabel}
          />
          <Footer
            leftItems={counter}
            clearCompleted={this.clearCompleted}
            filter={this.filter}
            filterValue={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    )
  }
}
