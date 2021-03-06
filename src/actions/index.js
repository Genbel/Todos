import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
})

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
})

export const fetchTodos = (filter) => (dispatch, getState) => {
    // In that case we don't have a direct access to getState of store
    // so we can pass for the thunk function as argument
    if(getIsFetching(getState(), filter)){
        return;
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => {
        dispatch(receiveTodos(filter, response));
    });
}

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});
