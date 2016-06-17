import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import todoApp from './reducers';
import { thunk } from 'redux-thunk';

const thunk = (store) => (next) => (action) =>
    typeof action === 'function'?
        // Setting like this the action, is available in all the actions
        // the dispatch function and getState. Video 22(4:00)
        action(store.dispatch, store.getState) :
        next(action);

const configureStore = () => {

    const middlewares = [thunk];
    if(process.env.NODE_ENV !== 'production'){
        middlewares.push(createLogger());
    }
    // We can add persistedState: Video 18, 1:05. I think is for the state of the store
    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );
}

// It is good to export the configure store like this after
// in test we can create as much as configure store
export default configureStore;

