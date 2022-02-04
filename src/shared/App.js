import './App.css';
import React from "react";

import {BrowserRouter, Route} from "react-router-dom";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";


import {Grid} from "../elements/Index";

function App() {
    return (
        <Grid>
            <Header></Header>
            <React.Fragment>
                <BrowserRouter>
                    <Route path="/" exact component={PostList}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={Signup}/>
                </BrowserRouter>
            </React.Fragment>
        </Grid>
    );
}

export default App;
