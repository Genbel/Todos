import { createStore } from 'redux';
import todoApp from './reducers';

const addLoggingToDispatch = (store) => {

    const rawDispatch = store.dispatch;

    if(!console.group){
        return rawDispatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state \n','color: green', store.getState());
        console.log('%c action \n', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state \n', 'color:red', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
}

// The middleware always is on top of the dispatch function.
// Thats why our middleware detect that is a promise return, line 30, because when we call an ActionCreator from VisibleTodoList,
// which return an action normally,
// the middleware is waiting to get some return object from the action creator and the API return at first is a promise object.
// After that 500ms time, we get the response and the middleware send to the next middleware in that case the log-redux object.
const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    // Is the way to tell that the action is a promise. Video 16(3:25)
    return (action) => {
        if(typeof action.then === 'function'){
            console.log(action);
            // We wait to the promise and we pass to the dispatch the action
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    }
}

const exampleOfInvokingOrNotTheFunction = (store, index) => {
    const rawDispatch = store.dispatch;
    if(index){
        console.log(rawDispatch);
        return rawDispatch;
    } else {
        return (action) => {
            console.log(action);
            return rawDispatch(action);
        }
    }
}

// The order how we set up the middlewares is really important. The last that we assign is
// going to be the first that is going to exec in the middleware chain.
// But first we need to override or overwrites the store.dispatch function.
const configureStore = () => {

    const store = createStore(todoApp);

    if(process.env.NODE_ENV !== 'production'){
        // Overwrite the dispatch method
        store.dispatch = addLoggingToDispatch(store);
    }
    store.dispatch = exampleOfInvokingOrNotTheFunction(store, false);

    store.dispatch = addPromiseSupportToDispatch(store);
    console.log(store);
    return store;
}

// It is good to export the configure store like this after
// in test we can create as much as configure store
export default configureStore;

