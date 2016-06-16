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

const configureStore = () => {

    const store = createStore(todoApp);

    if(process.env.NODE_ENV !== 'production'){
        // Overwrite the dispatch method
        store.dispatch = addLoggingToDispatch(store);
    }

    return store;
}

// It is good to export the configure store like this after
// in test we can create as much as configure store
export default configureStore;

