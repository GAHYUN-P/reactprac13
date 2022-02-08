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

import { useDispatch,useSelector } from 'react-redux';
import {actionCreators as userActions} from "../redux/modules/user";

import {apiKey} from "./firebase";
import Button from '../elements/Button';

import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';


function App() {
    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
            const is_session = sessionStorage.getItem(_session_key)
                ? true
                : false;

    React.useEffect(() => {
        if (is_session) {
            dispatch(userActions.loginCheckFB());
        }
    }, []);

    if(is_login && is_session){
        return (
            <Grid>
                <Header></Header>
                <React.Fragment>
                    <ConnectedRouter history={history}>
                        <Route path="/" exact component={PostList}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/signup" exact component={Signup}/>
                        <Route path="/write" exact component={PostWrite}/>
                        <Route path="/post/:id" exact component={PostDetail}/>
                    </ConnectedRouter>
                </React.Fragment>
                <Button is_float text="+" _onClick={() => {history.push('/write');}}></Button>
            </Grid>
        );
    }

    return (
        <Grid>
            <Header></Header>
            <React.Fragment>
                <ConnectedRouter history={history}>
                    <Route path="/" exact component={PostList}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={Signup}/>
                    <Route path="/write" exact component={PostWrite}/>
                </ConnectedRouter>
            </React.Fragment>
        </Grid>
    );
    
}

export default App;
