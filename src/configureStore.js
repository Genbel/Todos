import { createStore } from 'redux';
import todoApp from './reducers';

// That one can be called as logger middleware
const addLoggingToDispatch = (store) =>  (next) => {

    if (!console.group) {
        return next;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state \n', 'color: green', store.getState());
        console.log('%c action \n', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state \n', 'color:red', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
}

// That one can be called as promise middleware
const addPromiseSupportToDispatch = (store) => (next) => (action) => {
    if(typeof action.then === 'function'){

        return action.then(next);
    }
    return next(action);
}

// Video 17, 8:30
const wrapDispatchWithMiddlewares = (store, middlewares) => {
    // We will pass the previous value of the dispatch
    middlewares.slice().reverse().forEach( middleware =>
        store.dispatch = middleware(store)(store.dispatch)
    )
}

const configureStore = () => {

    const store = createStore(todoApp);
    // The method of extended store works but
    // it is not really great to override the public API and replace it with custom functions.
    // For that we will define a middlewares array
    const middlewares = [addPromiseSupportToDispatch];

    if(process.env.NODE_ENV !== 'production'){

        middlewares.push(addLoggingToDispatch);
    }

    wrapDispatchWithMiddlewares(store, middlewares);

    return store;
}

// It is good to export the configure store like this after
// in test we can create as much as configure store
export default configureStore;

