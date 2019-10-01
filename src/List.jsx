import React, { Component } from "react";
import PlanetInfo from "./PlanetInfo";

class List extends Component {
  render() {
    const films = this.props.films;

    return (
      <div className="">
        {films.map((p, num )=> {
          return (
            <div key={num}>
              <h1 className="char-name">{p.title}</h1>

              <PlanetInfo planetInfo={p} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default List;
