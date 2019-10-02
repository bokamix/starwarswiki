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
  
  }

  getPlanets= () => {
    this.setState({ loading: true }, () => {
    swapi.get(`${this.state.linkP}`).then(result => {
      this.setState({ planets: result, loading: false});
    });
  });
  }

  componentDidMount() {
    this.getPlanets();
  }

  render() {
    const { loading } = this.state;
    return (
      <>
      <tr red={loading ? `false` : `true`}>
        <th>{this.state.planets.name}</th>
        <th>{this.state.planets.rotation_period}</th>
        <th>{this.state.planets.orbital_period}</th>
        <th>{this.state.planets.diameter}</th>
        <th>{this.state.planets.climate}</th>
        <th>{this.state.planets.surface_water}</th>
        <th>{this.state.planets.population}</th>
      </tr>
      </>
    );
  }
}

export default ObjectInList;
