import { combineReducers } from 'redux'
// When we are doing * in means that we export all the named exports
import todos, * as fromTodos from './todos'

const todoApp = combineReducers({
  todos
})

export default todoApp;

// If it has get we will call name exports
// The state corresponds to the state of the combine reducers
// However, the state shape of todos reducer, should be encansulated in the file which is defined
// This is why we are delegating getVisibleTodos to its reducer
export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);