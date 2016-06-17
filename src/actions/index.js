import { v4 } from 'node-uuid';
import * as api from '../api';

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
})

export const fetchTodos = (filter) => {
    console.log('FetchTodos', api.fetchTodos(filter));
    return api.fetchTodos(filter).then(response => {
            console.log(response);
            return receiveTodos(filter, response)
        }
    );
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
