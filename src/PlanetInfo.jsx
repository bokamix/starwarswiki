import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled, { keyframes } from "styled-components";
import ArrowClose from "./assets/ARROWCLOSE.svg";
import ArrowOpen from "./assets/ARROWOPEN.svg";
import SortArrows from "./assets/SortArrows.svg";
import LoaderArrows from "./assets/LoaderArrowsS.png";
import { debounce } from "lodash";
import MobileTable from "./MobileTable";
const swapi = require("swapi-node");

/////Styles ////
const FilmTitle = styled.div`
  background: white;
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0px 2px 1px rgba(196, 196, 196, 0.2);
  h1 {
    color: #00687f;
    font-family: "Barlow", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
  }
  div {
    padding: 0 15px;
  }
`;
const TitleWrapper = styled.div`
  border-radius: 4px;
  box-shadow: 0px 2px 1px rgba(196, 196, 196, 0.2);
  @media all and (min-width: 806px) {
    width: 730px;
  }
  margin: 16px 30px;
  background: white;
`;

const HeadTable = styled.tr``;
const AboutPlanetTable = styled.table`
  width: 100%;
  p {
    font-family: "Barlow", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    position: relative;
    img {
      margin-left: 6px;
      position: absolute;
      bottom: 1;
    }
  }
  thead {
    border-bottom: 1px solid black;
  }
  tr {
    td:first-child {
      color: #00687f;
    }
    th {
      p {
        cursor: pointer;
        img {
          cursor: default;
        }
      }
    }
    th:first-child {
      color: #00687f;
    }
  }
  td {
    text-align: center;
  }
`;

const spin = keyframes`
from {transform: rotate(0deg);}
to    {transform: rotate(360deg);}
`;

const LoaderArrowsWrapper = styled.img`
  transform: rotate(360deg);
  transform-origin: top left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  -webkit-animation: ${spin} 2s ease-in-out infinite;
  -moz-animation: ${spin} 2s ease-in-out infinite;
  animation: ${spin} 2s ease-in-out infinite;
`;

const NoOnePlanetWrapper = styled.p`
  margin-left: 30px;
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  position: relative;
`;

/////Styles End///

class PlanetInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: [],
      toggle: true,
      planetsInfo: [],
      loadingPlanets: false,
      noOnePlanet: false,
      sortToggle: false
    };
  }
  componentDidMount() {
    this.setState({ planetsInfo: [] });
    if (this.props.filmInfo.planets.length === 0) {
      this.setState({ loadingPlanets: true, noOnePlanet: true });
    }
  }

  FilterArrow = () => {
    return (
      <>
        <img alt="SortArrows" src={SortArrows} />
      </>
    );
  };

  getPlanets = debounce(() => {
    this.setState({ planetsInfo: [] });
    this.props.filmInfo.planets.forEach((p) => {
      this.setState({ loadingPlanets: false }, () => {
        ///I download the planet data separately, because it was specified in the task.
        /// For efficiency, it would be better to download all the planets on one query and then filter them.
        /// "The planets for a specific movie should be fetched when we expand the movie details, not on initial app load."

        swapi
          .get(` https://mighty-chamber-74291.herokuapp.com/${p}`)
          .then(result => {
            this.state.planetsInfo.push(result);
            setTimeout(() => this.setState({ loadingPlanets: true }), 1200);
          })
          .catch(err => {
            console.log(
              `Error, not conection with SWAPI. Number of error: ${err}`
            );
          });
      });
    });
  }, 1600);

  onSortFunction = e => {
    this.setState({ sortToggle: !this.state.sortToggle });
    function dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function(a, b) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }
    function dynamicSortMultiple() {
      var props = arguments;
      return function(obj1, obj2) {
        var i = 0,
          result = 0,
          numberOfProperties = props.length;
        while (result === 0 && i < numberOfProperties) {
          result = dynamicSort(props[i])(obj1, obj2);
          i++;
        }
        return result;
      };
    }
    //////From string to number ////////
    ///Propably i can do this easier, but i do not have to more time ////
    
    let i;
    const keyTable = [`population`,  `orbital_period`, `rotation_period`, `surface_water`, `diameter`]
    
      
      if (keyTable.includes(e.target.id)){

        const keySort = e.target.id;        
    for (i = 0; i < this.state.planetsInfo.length; i++) {
        if (this.state.planetsInfo[i][keySort] === "unknown") {
          this.state.planetsInfo[i][keySort] = 123124124124124124124124;
      } else {
          this.state.planetsInfo[i][keySort] = parseInt(
          this.state.planetsInfo[i][keySort],
          10
        );
      }      
    }}
    //////END From string to number END ////////
    let accessKeyPosition = `${!this.state.sortToggle ? `-` : ``}${
      e.target.id
    }`;
    this.state.planetsInfo.sort(dynamicSortMultiple(accessKeyPosition));
    this.setState({ loadingPlanets: false });
    this.setState({ loadingPlanets: true });
    //////Back unkown element to string////////    
    if (keyTable.includes(e.target.id)){
      const keySort = e.target.id; 
    for (i = 0; i < this.state.planetsInfo.length; i++) {
      if (this.state.planetsInfo[i][keySort] === 123124124124124124124124) {
        this.state.planetsInfo[i][keySort] = "unknown";
      }      
    }}
    ////// END  Back unkown element to string END////////
  };

  onToggle = () => {
    this.setState({ toggle: !this.state.toggle });    
    this.state.toggle && this.setState({ planetsInfo: [] });
    this.getPlanets();    
    this.setState({ planetsInfo: [] });
  };

  render() {
    const TableWrapper = styled.div`
      height: ${`${147 * this.props.filmInfo.planets.length}px`};
      @media all and (min-width: 806px) {
        height: ${`${37 + 47 * this.props.filmInfo.planets.length}px`};
      }
      width: 100%;
      position: relative;
    `;
    return (
      <TitleWrapper>
        <FilmTitle onClick={this.onToggle}>
          <div>
            <h1>{this.props.filmInfo.title}</h1>
          </div>
          <div>
            <img alt="opencloseArrow"src={!this.state.toggle ? ArrowClose : ArrowOpen} />
          </div>
        </FilmTitle>

        {!this.state.toggle && (
          <TableWrapper>
            {!this.state.loadingPlanets && (
              <LoaderArrowsWrapper src={LoaderArrows} />
            )}
            {this.state.noOnePlanet ? (
              <NoOnePlanetWrapper>
                This is an episode in Millennium Falcon
              </NoOnePlanetWrapper>
            ) : (
              <>
                <AboutPlanetTable className="desktop-table">
                  <thead>
                    <HeadTable>
                      <th >
                        <p id="name" onClick={this.onSortFunction} >
                          Planet Name{this.FilterArrow()}
                        </p>
                      </th>
                      <th >
                        <p
                          id="rotation_period" onClick={this.onSortFunction}
                          
                        >
                          Rotation period{this.FilterArrow()}
                        </p>
                      </th>
                      <th >
                        <p
                         id="orbital_period" onClick={this.onSortFunction}
                          
                        >
                          Orbital period{this.FilterArrow()}
                        </p>
                      </th>
                      <th >
                        <p id="diameter" onClick={this.onSortFunction} >
                          Diameter{this.FilterArrow()}
                        </p>
                      </th>
                      <th >
                        <p id="climate" onClick={this.onSortFunction} >
                          Climate{this.FilterArrow()}
                        </p>
                      </th>
                      <th >
                        <p
                         id="surface_water" onClick={this.onSortFunction}
                          
                        >
                          Surface water{this.FilterArrow()}
                        </p>
                      </th>
                      <th >
                        <p id="population" onClick={this.onSortFunction} >
                          Population{this.FilterArrow()}
                        </p>
                      </th>
                    </HeadTable>
                  </thead>
                  <tbody>
                    {this.state.planetsInfo.map((p, num) => {
                      return (
                        <tr key={num}>
                          <td>
                            <p>{p.name}</p>
                          </td>
                          <td>
                            <p>{p.rotation_period}</p>
                          </td>
                          <td>
                            <p>{p.orbital_period}</p>
                          </td>
                          <td>
                            <p>{p.diameter}</p>
                          </td>
                          <td>
                            <p>{p.climate}</p>
                          </td>
                          <td>
                            <p>{p.surface_water}</p>
                          </td>
                          <td>
                            <p>{p.population}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </AboutPlanetTable>
              </>
            )}
            {this.state.planetsInfo.map((p, num) => (
              <MobileTable data={p} key={num} />
            ))}
          </TableWrapper>
        )}
      </TitleWrapper>
    );
  }
}
PlanetInfo.propTypes = {
 filmInfo: PropTypes.object.isRequired,
};
export default PlanetInfo;
