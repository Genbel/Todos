import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(t => t.completed)
    case 'active':
      return todos.filter(t => !t.completed)
  }
}

// If we dont set withRouter, we cannot access to params values.
// IMPORTANT: react-router has to be 3.0 version
const mapStateToProps = (state, ownProps) => ({
    todos: getVisibleTodos(
        state.todos,
        ownProps.params.filter || 'all'
    )
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id){
      dispatch(toggleTodo(id))
    }
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList))

export default VisibleTodoList
