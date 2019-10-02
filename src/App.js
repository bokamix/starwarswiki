import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      value: ``,
      search: "",
      searchResult: [],
      planet: [],
      valueName: "",
      planetToAdd: [],
      planetToAddUrl:[]
    };  
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
  onChangeValue = (event) => {
    this.setState({ valueName: event.target.value });
  };
  onHandleChange = (event) => {
    this.setState({
      value: event.target.value,
      search: `https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/planets/?search=${this.state.value}`
    });
    ///Muszę dodać opóźnienie w zapytaniach, żeby nie spamować zapytaniami przy każdej literacji tylko
    // musi się zapytywać gdy przestanę pisać na 1 sec
    return axios.get(`${this.state.search}`).then(response => {
      if (response.data.results === undefined) {
        console.log("kdas");
      } else {
        this.setState({ searchResult: response.data.results });
      }
    });
  };

  onAddItem = () => {
    this.setState(state => {
      this.state.searchResult.map((name, num) => {
        this.state.planet.push(`${name.url}`);
      });
      const films = [
        ...state.films,
        { title: state.valueName, planets: state.planetToAddUrl }
      ];

      return {
        films,
        value: "",
        valueName: "",
        planets: "",
        planet: [],
        planetToAdd:[],
        planetToAddUrl:[]
      };
    });
  };
  onAddPlanet = (event) => {
    let number = [...event.target.parentNode.children].indexOf(event.target);
    this.state.planetToAdd.push(`${this.state.searchResult[number].name}`);
    this.state.planetToAddUrl.push(`${this.state.searchResult[number].url}`)
    this.setState({ searchResult: [], value: "" });
   
    //must add verification to double value
  };

  render() {
    const { films } = this.state;
    return (
      <div className="App">
        <List films={films} />       
        <div>
          <label>Movie Title</label>
          <input
            type="text"
            value={this.state.valueName}
            onChange={this.onChangeValue}
          />
          {this.state.planetToAdd.map((name, num) => {
            return <p key={num}>{name}</p>;
          })}
          <label>Add Planet</label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onHandleChange}
          />

          <div>
            {/* List of search element, function get number of chieldren from this div \/  do not delete him*/}
            {this.state.searchResult.map((name, num) => {
              return (
                <p onClick={this.onAddPlanet} key={num}>
                  {name.name}
                </p>
              );
            })}
          </div>

          <button
            type="button"
            onClick={this.onAddItem}
            disabled={!this.state.planetToAdd}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default App;
