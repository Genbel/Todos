const byId = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_TODOS':
            const nextState = { ...state};
            action.response.forEach(todo => {
                // Normally that one it would be a mutation because we are editing the
                // state. But in that case we have a shallow object copy so we can do. video 20(5:10)
                nextState[todo.id] = todo;
            });
            return nextState;
        default:
            return state
    }
}

export default byId;

export const getTodo = (state, id) => state[id]