import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import Select from 'react-select';
<<<<<<< HEAD
import axios from 'axios';

=======
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import DetailsPage from './DetailsPage.jsx';

const axios = require('axios');
>>>>>>> 756c6909470b077c4865313833cfbe676da31872
var options = [];
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      zip_code: "",
      max_age: "",
      animal: "",
      response: [],
      responseBreed: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  onSelectChanged(optionSelected) {
    console.log(optionSelected)
    let sql1 = "http://localhost:5000/getList?type=" + 'BREED' +"&animal="+optionSelected.value ;
    axios.get(sql1).then(response => {
      console.log(response)
      this.setState(
        {
          responseBreed: response.data.data
        }
      )
      console.log(this.state)
  })
  }
  componentDidMount(){
    let sql = "http://localhost:5000/getList?type=" + 'ANIMAL';
    axios.get(sql).then(response => {
      console.log(response)
      this.setState(
        {
          response: response.data.data
        }
      )
      console.log(this.state)
  })
  
  }

  submit(){
    this.props.router.push('/details')
  }
  render() {
    const { max_age, zip_code, response,responseBreed } = this.state;
    if(response.length>=0){
      var options = [];
      for(var i=0;i<response.length; i++) {
        var aniamlOptions = {
            value: response[i].animal,
            label: response[i].animal
          };
          options.push(aniamlOptions);
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
          <Link to="/about">Home</Link>
          <Link to={{
            pathname: "/details",
            data: "data12345" // your data array of objects
          }}>About</Link>
          <Route path="/details" component={DetailsPage} />
          <Route path="/about" component={AboutPage} />
        </Router>
      <div>
        
      </div>
      <form id="article-form">
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
       {/* to make the select tag required*/}
         
        </div>
        
        <div>
         <div><span>Breed</span></div>
         <Select
          name="form-field-name"
          value={this.state.brandSelect}
          options={options1}
          placeholder="Select a Breed"
          searchable={false} 
        />
        
        </div>
<<<<<<< HEAD
         <button>submit</button>
=======
        <button onClick={this.submit}>animal</button>
>>>>>>> 756c6909470b077c4865313833cfbe676da31872
      </form>

      </>
    );
  }
}
export default FormContainer;  
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
