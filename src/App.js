import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import AddListForm from '../src/AddListForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        films: [],
        value: '',
        planet: [`https://swapi.co/api/planets/1`],
     
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
  
  

  getSearch() {
    return axios
      .get(
        "https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/people/?search=r2"
      )
      .then(response => {
        console.log(response.data.results)
        
      });
  } 
  componentDidMount() {
    this.getFilms();
  }
  onChangeValue = event => {
    this.setState({ value: event.target.value });
  };
  onHandleChange = event => {
    this.setState({ ...this.state.planet, planet: event.target.value });
  };
  onAddItem = () => {
    this.setState(state => {
      const films = [...state.films, {title: state.value, planets: [state.planet]}];
      return {
        films,
        value: '',
        planet: ''
      };
    });
  
  };
  render() {
    const { films } = this.state;
    return (
      <div className="App">
        <List films={films} />
       {console.log(this.state.films)}
        <div>
        
        <input
          type="text"
          value={this.state.value}
          onChange={this.onChangeValue}
        />
     <select
       value={this.state.planet} 
       onChange={this.onHandleChange}>
        <option value={`https://swapi.co/api/planets/1`}>Brak planet</option>
        <option value={`https://swapi.co/api/planets/2`}>sdsd</option>
        <option value={`https://swapi.co/api/planets/3`}>sdwqsd</option>
    </select>
        <button
          type="button"
          onClick={this.onAddItem}
          disabled={!this.state.value}
        >
          Add
        </button>
      </div>
        <AddListForm />
      </div>
    );
  }
}

export default App;
