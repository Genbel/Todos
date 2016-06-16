import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

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

const configureStore = () => {

    // Sometimes we want to have a initial state already
    // Filled with something.
    // We if we set in the create store as a second argument,
    // we can pass there the initial state filled with something
    const persistedState = loadState();

    const store = createStore(todoApp, persistedState);

    if(process.env.NODE_ENV !== 'production'){
        // Overwrite the dispatch method
        store.dispatch = addLoggingToDispatch(store);
    }

    // When the store change it will trigger subscribe and it will save in the localStoreage
    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        });
    }), 1000);

    return store;
}

// It is good to export the configure store like this after
// in test we can create as much as configure store
export default configureStore;

