import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import styled from "styled-components";
import DeleteButton from "./assets/DELETE.svg";

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
      planetToAddUrl: []
    };
  }
  ///Get Planet from SWAPI
  getFilms() {
    return axios
      .get(
        "https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/films"
      )
      .then(response => {
        this.setState({ films: response.data.results });
      });
  }
  ///Get Planet from SWAPI when component is load
  componentDidMount() {
    this.getFilms();
  }
  onChangeValue = event => {
    this.setState({ valueName: event.target.value });
  };

  ///Search Event
  onHandleSearch = event => {
    this.setState({
      value: event.target.value,
      search: `https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/planets/?search=${this.state.value}`
    });
    ///We will use Lodash to minimalize number of GET method

    return axios.get(`${this.state.search}`).then(response => {
      if (response.data.results === undefined) {
        console.log("kdas");
      } else {
        this.setState({ searchResult: response.data.results });
      }
    });
  };
  //event who add film to films list
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
        planetToAdd: [],
        planetToAddUrl: []
      };
    });
  };
  //Event who add planet to custom film lists planet
  onAddPlanet = event => {
    let number = [...event.target.parentNode.children].indexOf(event.target);
    this.state.planetToAdd.push(`${this.state.searchResult[number].name}`);
    this.state.planetToAddUrl.push(`${this.state.searchResult[number].url}`);
    this.setState({ searchResult: [], value: "" }); //reset value

    //must add verification to double value
  };
  onDeletePlanet = num => {
    this.state.planetToAdd.splice(num, 1);
    this.state.planetToAddUrl.splice(num, 1);
    this.setState({ ...this.state.planetToAdd, ...this.state.planetToAddUrl }); //reset value
  };

  render() {
    const { films } = this.state;
    return (
      <div className="App">
        <List films={films} />
        <div>
          {/* Film to ADD*/}
          <label>Movie Title</label>
          <input
            type="text"
            value={this.state.valueName}
            onChange={this.onChangeValue}
          />

          {/* Planet to ADD */}
          {this.state.planetToAdd.map((name, num) => {
            return (
              <div key={num}>
                <p>{name}</p>
                <div onClick={() => this.onDeletePlanet(num)}>
                  <img src={DeleteButton} />
                </div>
              </div>
            );
          })}
          <label>Add Planet</label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onHandleSearch}
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
