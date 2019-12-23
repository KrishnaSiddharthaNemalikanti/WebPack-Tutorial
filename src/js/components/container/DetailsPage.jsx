import React, {Component} from 'react';

const axios = require('axios');

class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.loadDetails = this.loadDetails.bind(this);
        this.state = {
            detailsRequested: false,
            listOfItems: []
        };
    }

    loadDetails() {
        let sql1 = "http://localhost:5000/animalList";
        let body = {
            location: this.props.zipCode,
            animal: this.props.selectedAnimal,
            breed: this.props.selectedBreed,
            age: this.props.maxAge
        };
        axios.post(sql1, body).then(response => {
            console.log(response)
            const res = response.data.data
            sessionStorage.setItem("prevResults", JSON.stringify(res))
            this.setState(
                {
                    detailsRequested: true,
                    listOfItems: res
                }
            )
        })
    }

    render() {
        if (this.state.detailsRequested == false || sessionStorage.getItem("prevResults") === 'undefined') {
            this.loadDetails()
        }
        const prevResults = sessionStorage.getItem("prevResults")
        console.log("prevResults",prevResults)
        const listItems = (prevResults !== 'undefined' ? JSON.parse(prevResults) : this.state.listOfItems).map((d) =>
            <li key={d.id}>name: {d.name} age: {d.age} location: {d.location}
                <img src={'data:image/jpeg;base64,' + d.picture.data.toString('base64')}/>
            </li>);
        console.log("list of items in render page", listItems)
        return (
            <div>
                <span>List of available options for {this.props.selectedAnimal.toLowerCase()} and breed {this.props.selectedBreed.toLowerCase()}</span>
                <ol>
                    {listItems}
                </ol>
            </div>
        );
    }
}


export default DetailsPage;