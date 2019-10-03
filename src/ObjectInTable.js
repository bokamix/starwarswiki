import React, { Component } from "react";
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
        <td><p>{this.state.planets.name}</p></td>
        <td><p>{this.state.planets.rotation_period}</p></td>
        <td><p>{this.state.planets.orbital_period}</p></td>
        <td><p>{this.state.planets.diameter}</p></td>
        <td><p>{this.state.planets.climate}</p></td>
        <td><p>{this.state.planets.surface_water}</p></td>
        <td><p>{this.state.planets.population}</p></td>
      </tr>
      </>
    );
  }
}

export default ObjectInList;
