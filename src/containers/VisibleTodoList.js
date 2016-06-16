import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from '../components/TodoList'

// If we dont set withRouter, we cannot access to params values of properties.
// IMPORTANT: react-router has to be 3.0 version
// In that case we pass all the state of the application and any time will change to state value,
// it will pass to mapStateToProps function
// Now getVisibleTodos is a selector, so it will select what kind of data display.
// Our selector has all the knowladge of the application state
const mapStateToProps = (state, ownProps) => ({
    todos: getVisibleTodos( state, ownProps.params.filter || 'all')
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id){
      dispatch(toggleTodo(id))
    }
});

const VisibleTodoList = withRouter(connect( mapStateToProps, mapDispatchToProps )(TodoList))

export default VisibleTodoList
