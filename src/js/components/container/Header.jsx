import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
const axios = require('axios');

class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className= "header">
                <Link to="/home">New Search Form</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/details">Previous Results</Link>
            </div>
        );
    }
}


export default Header;