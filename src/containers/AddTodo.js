import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

// Get the dispatch function from props
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
// If we write like this we do not set any state but yes the dispatch funcion,
// function from props
AddTodo = connect()(AddTodo)

export default AddTodo
