import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList'

class VisibleTodoList extends Component {

    renderTodos(){
        console.log(this.props);
        const { filter, fetchTodos } = this.props;
        fetchTodos(filter);
    }
    componentDidMount(){
        this.renderTodos();
    }

    componentDidUpdate(prevProps){
        if(this.props.filter !== prevProps.filter ){
            this.renderTodos();
        }
    }
    render() {
        const { toggleTodo, todos, isFetching } = this.props;

        if(isFetching && !todos.length){
            return <b>Loading ...</b>;
        }
        return (
            <TodoList
                todos={todos}
                onTodoClick={toggleTodo}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    const filter = ownProps.params.filter || 'all';

    return {
        filter: filter,
        isFetching: getIsFetching(state, filter),
        todos: getVisibleTodos( state, ownProps.params.filter || 'all')
    }
};

VisibleTodoList = withRouter(connect( mapStateToProps, actions )(VisibleTodoList))

export default VisibleTodoList
