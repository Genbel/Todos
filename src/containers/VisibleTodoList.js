import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from '../components/TodoList'

class VisibleTodoList extends Component {

    renderTodos(){
        const { filter, fetchTodos } = this.props;
        console.log(filter);
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
        const { toggleTodo, ...rest } = this.props;
        return (
            <TodoList
                {...rest}
                onTodoClick={toggleTodo}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    const filter = ownProps.params.filter || 'all';
    return {
        filter: filter,
        todos: getVisibleTodos( state, ownProps.params.filter || 'all')
    }
};

VisibleTodoList = withRouter(connect( mapStateToProps, actions )(VisibleTodoList))

export default VisibleTodoList
