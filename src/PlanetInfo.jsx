import React, { Component } from "react";

import axios from "axios";
import ObjectInList from "./ObjectInTable";

class PlanetInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      planets: []
    };
    this.getPlanets = this.getPlanets.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  getPlanets() {
    return axios
      .get(
        `https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/planets`
      )
      .then(response => {
        this.setState({ planets: response.data.results });
      });
  }

  componentDidMount() {
    this.getPlanets();
  }
  open() {
    this.setState({ expanded: !this.state.expanded });
  }

  close() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const info = this.props.planetInfo;

    if (!this.state.expanded) {
      return (
        <p className="btn btn-info" onClick={this.open}>
          Show info
        </p>
      );
    }

    return (
      <div className="user-details">
        <p className="btn btn-danger" onClick={this.close}>
          Hide info
        </p>
        <table>
          <thead>
            <tr>
              <th>Planet Name</th>
              <th>Rotation period</th>
              <th>Orbital period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Surface water</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {info.planets.map((p, num) => {
              return (
                <ObjectInList
                  key={num}
                  open={this.state.expanded}
                  PlanetNumber={p}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlanetInfo;
