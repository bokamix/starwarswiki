import React, { Component } from "react";
import List from "./List";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        films: [],
        value: ``,
        search: '',
        searchResult: [],
        planet: [],
        nameValue: ''
     
    };

    this.getFilms = this.getFilms.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.dajMnieTo = this.dajMnieTo.bind(this);
    
  }

  getFilms() {
    return axios
      .get(
        "https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/films"
      )
      .then(response => {
        this.setState({ films: response.data.results });
      });
  }
  
  


  componentDidMount() {
    this.getFilms();
  }
  onChangeValue = event => {
    this.setState({ valueName: event.target.value });
    
  }
  onHandleChange = event => {
    this.setState({ value: event.target.value, search: `https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/planets/?search=${this.state.value}` });
///Muszę dodać opóźnienie w zapytaniach, żeby nie spamować zapytaniami przy każdej literacji tylko 
// musi się zapytywać gdy przestanę pisać na 1 sec 
    return axios
    .get(`${this.state.search}`).then(response => {
  
      if(response.data.results === undefined){
      console.log("kdas")}
      else{
      this.setState({searchResult: response.data.results}) }
     
    });    
  }

  onAddItem = () => {
 
    
    this.setState(state => {
      this.state.searchResult.map((name, num) => {
        this.state.planet.push(`${name.url}`)     
       }); 
      const films = [...state.films, {title: state.valueName, planets: state.planet}];
      
      return {        
        films,
        value: '',
        valueName:'',
        planets:'',
       
      };
    }); 
    
  };

  dajMnieTo = () => {
    
   console.log('asd')

    }
  
  
  
  render() {
    const { films } = this.state;
    return (
      <div className="App">
        <List films={films} />
    {console.log(this.state.films)}
        <div>
        {this.state.searchResult.map((name, num) => {
              return (
                <p key={num}>{name.name}</p>
              );
            })}
       <input
          type="text"
          value={this.state.valueName}
          onChange={this.onChangeValue}
        />
        <input
          type="text"
          value={this.state.value}
          onChange={this.onHandleChange}
        />
   
        <button
          type="button"
          onClick={this.onAddItem}
          disabled={!this.state.value}
        >
          Add
        </button>
      </div>
    
      </div>
    );
  }
}

export default App;
