import React, { Component } from "react";
import axios from "axios";
const swapi = require("swapi-node");

class ObjectInList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: [],
      linkP: `https://mighty-chamber-74291.herokuapp.com/${this.props.PlanetNumber}`
    };
    this.getPlanets = this.getPlanets.bind(this);
  }

  getPlanets() {
    swapi.get(`${this.state.linkP}`).then(result => {
      this.setState({ planets: result });
    });
  }

  componentDidMount() {
    this.getPlanets();
  }

  render() {
    return (
      <tr>
        <th>{this.state.planets.name}</th>
        <th>{this.state.planets.rotation_period}</th>
        <th>{this.state.planets.orbital_period}</th>
        <th>{this.state.planets.diameter}</th>
        <th>{this.state.planets.climate}</th>
        <th>{this.state.planets.surface_water}</th>
        <th>{this.state.planets.population}</th>
      </tr>
    );
  }
}

export default ObjectInList;
