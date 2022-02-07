import './App.css';
import React from "react";

import {BrowserRouter, Route} from "react-router-dom";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";


import {Grid} from "../elements/Index";
import { ConnectedRouter } from 'connected-react-router';
import { history } from "../redux/configureStore";

function App() {
    return (
        <Grid>
            <Header></Header>
            <React.Fragment>
                <ConnectedRouter history={history}>
                    <Route path="/" exact component={PostList}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={Signup}/>
                </ConnectedRouter>
            </React.Fragment>
        </Grid>
    );
}

export default App;
