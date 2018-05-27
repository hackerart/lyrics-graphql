import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './scenes/App';
import Home from './scenes/Home/Home';
import CreateSong from './scenes/CreateSong/CreateSong';
import SongDetails from './scenes/SongDetails/SongDetails';

const client = new ApolloClient({
    dataIdFromObject: a => a.id
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="songs/new" component={CreateSong} />
                    <Route path="songs/:id" component={SongDetails} />
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);
