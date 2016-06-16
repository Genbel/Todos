const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

// That states corresponds the state of that particular reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}
// The default export is always the reducer function, in that case
export default todos

// We call to this function SELECTORS because it select something from the current state
// Any named function of 'get' is that prepares the data to be displayed for the UI
// We follow the same convention in the selector. The state argument will follow to the state of the exported reducer
// If we want to change, the only thing that we have to change is getVisibleTodos but I will not change my component implementation because
// because they dont rely on the state shape anymore
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state
    case 'completed':
      return state.filter(t => t.completed)
    case 'active':
      return state.filter(t => !t.completed)
    default:
          throw new Error(`Unkown filter: ${filter}.`);
  }
}