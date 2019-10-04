import PropTypes from 'prop-types';
import React, { Component } from "react";
import PlanetInfo from "./PlanetInfo";
import styled from "styled-components";
class List extends Component {
  render() {
    const films = this.props.films;
    const FilmPlanetList = styled.div`
      min-height: 462px;
      border-bottom: dashed 2px #ffffff;
      margin-bottom: 30px;
    `;
    return (
      <FilmPlanetList>
        {films.map((p, num) => {
          return (
            <div key={num}>
              <PlanetInfo filmInfo={p} />
            </div>
          );
        })}
      </FilmPlanetList>
    );
  }
}
List.propTypes = {
  films: PropTypes.array.isRequired,
};
export default List;
