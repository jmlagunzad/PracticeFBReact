import React, { Component } from 'react';
import App from "../App";
import About from "../About";

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


const styleLink = {
    color: 'white'
};

const NavBar = () => {

    console.log('NavBar - Rendered');
  
    return (
    <Router>
        <div>
            <nav className="navbar navbar-dark bg-dark">
            <div>
                <Link style={styleLink} to="/" className="navbar-brand">
                    MyProfile
                </Link>
                <Link style={styleLink} to="/about">
                    About
                </Link>
            </div>
            </nav>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/about" exact component={About} />
                <Route path="/about/:name" component={About} />
            </Switch>
        </div> 
    </Router>
    
      
      );
};

export default NavBar;