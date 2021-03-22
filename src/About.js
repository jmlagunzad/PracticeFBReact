import React, { Component } from 'react';
import './App.css';

function About({ match }) {
    console.log(match)
    return (
        <div>
            <h1>About Page</h1>
            <h1>{match.params.name}</h1>
        </div>
    );
}

export default About;