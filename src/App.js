import React, { Component } from "react";
import List from "./List";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        films: [],
        value: ``,
        search: ``,
        planet: [],
     
    };

    this.getFilms = this.getFilms.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    
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
    this.setState({ value: event.target.value });
  };
  onHandleChange = event => {
    this.setState({ value: event.target.value, search: `https://swapi.co/api/planets/?search=${this.state.value}` });
  
    return axios
    .get(`${this.state.search}`).then(response => {
      console.log(response.data.results)   
      if(response.data.results === undefined){
      console.log("kdas")}
      else{
      this.setState({planet: response.data.results}) }
      
    });
    
  };
  onAddItem = () => {
    this.setState(state => {
      const films = [...state.films, {title: state.value}];
      return {
        films,
        value: '',
       
      };
    });
  
  };
  render() {
    const { films } = this.state;
    return (
      <div className="App">
        <List films={films} />
    
        <div>
        {this.state.planet.map((name, num) => {
              return (
                <p key={num}>{name.name}</p>
              );
            })}
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
