import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {

    const middlewares = [promise];
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

