import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { Route, Router, browserHistory } from 'react-router';

const Root = ({ store }) => {

    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App} />
            </Router>
        </Provider>
    );
}

export default Root;