import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {

    // Sometimes we want to have a initial state already
    // Filled with something.
    // We if we set in the create store as a second argument,
    // we can pass there the initial state filled with something
    const persistedState = loadState();

    const store = createStore(todoApp, persistedState);

    

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

