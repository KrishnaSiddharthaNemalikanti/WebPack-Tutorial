import React, { Component } from 'react';

class DetailsPage extends Component {
    constructor(props){
        super(props);
        console.log(this.props.location.data)
    }
    render() {
        return (
            <div>
                <span>asddsa</span>
            </div>
        );
    }
}

export default DetailsPage;