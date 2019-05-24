import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';

const App = () => {
    return  (
        <div className="ui container">
            <Router history={ history }>
                <Header/>
                <div>
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/streams/new" component={StreamCreate}/>
                    <Route path="/streams/edit/:id" component={StreamEdit}/>
                    <Route path="/streams/delete" component={StreamDelete}/>
                    <Route path="/streams/show" component={StreamShow}/>
                </div>
            </Router>
        </div>
    );
};

export default App;