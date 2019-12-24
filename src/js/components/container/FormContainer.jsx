import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import Select from 'react-select';
import { BrowserRouter as Router, Route, withRouter , Switch} from 'react-router-dom';
import DetailsPage from './DetailsPage.jsx';
import Header from './Header.jsx';

const axios = require('axios');

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      zip_code: "",
      max_age: "",
      selectedAnimal: "",
        selectedBreed:"",
      response: [],
      responseBreed: [],
        redirectToDetails: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  onSelectChanged(optionSelected) {
    let sql1 = "http://localhost:5000/getList?type=" + 'BREED' +"&animal="+optionSelected.value ;
    axios.get(sql1).then(response => {
      this.setState(
        {
            selectedAnimal: optionSelected.value,
          responseBreed: response.data.data
        }
      )
  })
  }
    onSelectChangedBreed(optionSelected){
        this.setState(
            {
                selectedBreed: optionSelected.value
            })
    }
  componentDidMount(){
    let sql = "http://localhost:5000/getList?type=" + 'ANIMAL';
    axios.get(sql).then(response => {
      this.setState(
        {
          response: response.data.data
        }
      )
  })
  }

  submit(){
      this.setState(
          {
              redirectToDetails: true
          }
      )
  }
  render() {
    const { max_age, zip_code, response,responseBreed , redirectToDetails} = this.state;
      if(redirectToDetails === true)
      {
          return <DetailsPage zipCode = {this.state.zip_code}
                              maxAge = {this.state.max_age}
                              selectedAnimal = {this.state.selectedAnimal}
                              selectedBreed = {this.state.selectedBreed}/>
      }
    if(response.length>=0){
      var options = [];
      for(var i=0;i<response.length; i++) {
        var animalOptions = {
            value: response[i].animal,
            label: response[i].animal
          };
          options.push(animalOptions);
      }

    }
    if(responseBreed.length>=0){
      var options1 = [];
      for(var i=0;i<responseBreed.length; i++) {
        var breedOptions = {
            value: responseBreed[i].breed,
            label: responseBreed[i].breed
          };
          options1.push(breedOptions);
      }
    }

    const AboutPage = () => {
      return (
        <h3>About Page</h3>
      );
    };
    return (
      <>
        <Router>
            <Header/>
            <Switch>
            <Route path = "/details">
                <DetailsPage zipCode = {this.state.zip_code}
                             maxAge = {this.state.max_age}
                             selectedAnimal = {this.state.selectedAnimal}
                             selectedBreed = {this.state.selectedBreed}/>
            </Route>
            <Route path = "/home">
                <div>
                    <Input
                        text="Maximum Age"
                        label="max_age"
                        type="text"
                        id="max_age"
                        value={max_age}
                        handleChange={this.handleChange}
                    />
                    <Input
                        text="Zip Code"
                        label="zip_code"
                        type="text"
                        id="zip_code"
                        value={zip_code}
                        handleChange={this.handleChange}
                    />
                    <div>
                        <div><span>Animal</span></div>
                        <Select
                            name="form-field-name"
                            value={this.state.brandSelect}
                            options={options}
                            placeholder="Select an animal"

                            onChange={e => this.onSelectChanged(e)}

                        />
                    </div>
                    <div>
                        <div><span>Breed</span></div>
                        <Select
                            name="form-field-name"
                            value={this.state.brandSelect}
                            options={options1}
                            placeholder="Select a Breed"
                            searchable={false}
                            onChange={e => this.onSelectChangedBreed(e)}
                        />

                    </div>
                </div>
                <button onClick={this.submit}>Submit</button>
            </Route>
            </Switch>
        </Router>
      </>
    );
  }
}
export default withRouter(FormContainer);
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<Router><FormContainer /></Router>, wrapper) : false;
