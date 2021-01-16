import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';


const Routes: React.FC = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/home/:page" component={Home} />
                <Route path="/editBook/:id" component={EditBook} />
                <Route path="/addBook" component={AddBook} />
                <Redirect from="*" to="/home/1" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;