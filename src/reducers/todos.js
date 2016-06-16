import { combineReducers } from 'redux';
import todo from './todo';

// The previous implementation was not correct one because we can have,
// same id in different array(with v4-uuid it could be imposible but just in case)
// To fix this problem we will create a look-up table that it works as database table
//
const byId = (state = {}, action) => {
  switch (action.type) {
    // Now the value is gonna change in the look up table
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
        // From now both actions will do the same so when,
        // we want want to change a to do or add it will change
        // our actual look-up table.
        // Here we are using object spread operator. This is not part of ES6, so
        // we need to enable a plugin 'transform-object-rest-spread' video 11 (1:11)
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      }

    default:
      return state
  }
}

// Another Reducer, to track all the ids
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
          return [...state, action.id];
    default:
          return state;
  }
}

// create inside of reducer another reducers
const todos = combineReducers({
  byId,
  allIds
});

export default todos;

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);



export const getVisibleTodos = (state, filter) => {

  const allTodos = getAllTodos(state);

  switch (filter) {
    case 'all':
      return allTodos
    case 'completed':
      return allTodos.filter(t => t.completed)
    case 'active':
      return allTodos.filter(t => !t.completed)
    default:
          throw new Error(`Unkown filter: ${filter}.`);
  }
}