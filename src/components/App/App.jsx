import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTasksForm from '../NewTasksForm/NewTasksForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

export default class App extends Component {
  idNumber = 100
  state = {
    todoData: [],
    filter: 'All',
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
      creatingDate: creatingDate,
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
    this.timer()
  }
  interval = null
  timer = () => {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.setState(({ todoData }) => {
          return {
            todoData: todoData.map((item) => ({
              ...item,
              creationTime: formatDistanceToNow(item.creatingDate, { includeSeconds: true }),
            })),
          }
        })
      }, 5000)
    }
  }

  deleteItem = (id) => {
    this.setState(
      ({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const newData = todoData.toSpliced(idx, 1)

        return {
          todoData: newData,
        }
      },
      () => {
        if (this.state.todoData.length === 0) {
          clearInterval(this.interval)
          this.interval = null
        }
      }
    )
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
