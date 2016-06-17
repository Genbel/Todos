import { createStore } from 'redux';
import todoApp from './reducers';

const addLoggingToDispatch = (store) => {
    // In that case it will return to the original dispatch of the store
    const next = store.dispatch;

    if(!console.group){
        return next;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state \n','color: green', store.getState());
        console.log('%c action \n', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state \n', 'color:red', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
}

const addPromiseSupportToDispatch = (store) => {
    // rawDispatch is the previous value of the dispatch
    // We will change rawDispatch for next because this is the next dispatch function in the chain
    // that we will launch
    const next = store.dispatch;

    return (action) => {
        if(typeof action.then === 'function'){

            return action.then(next);
        }
        return next(action);
    }
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.forEach( middleware =>
        store.dispatch = middleware(store)
    )
}

const configureStore = () => {

    const store = createStore(todoApp);
    // The method of extended store works but
    // it is not really great to override the public API and replace it with custom functions.
    // For that we will define a middlewares array
    const middlewares = [];

    if(process.env.NODE_ENV !== 'production'){

        middlewares.push(addLoggingToDispatch);
    }

    middlewares.push(addPromiseSupportToDispatch);

    wrapDispatchWithMiddlewares(store, middlewares);
    
    return store;
}

// It is good to export the configure store like this after
// in test we can create as much as configure store
export default configureStore;

