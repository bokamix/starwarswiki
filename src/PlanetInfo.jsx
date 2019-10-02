import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import axios from "axios";
import ObjectInList from "./ObjectInTable";
import styled from 'styled-components';
class PlanetInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      planets: [],
      toggle:false 
    };

  
  }

  onToggle = () => {

    this.setState({ toggle: !this.state.toggle  });

  }


 
  

  componentDidMount() {
  
  }
 
  render() {
    const FilmTitle = styled.div`
    background:white;
    margin:30px;
    
  `;
   const TitleWrapper = styled.div`
   background:white;
  
   width:100%;
 `;

    const TableGenerator =  this.props.planetInfo.planets.map((p, num) => 
    <ObjectInList key={num} open={this.state.expanded} PlanetNumber={p}  />
    );
       
  

    return (
      <FilmTitle>
         <TitleWrapper onClick={this.onToggle}>
              <h1  className="film-name">{this.props.planetInfo.title}</h1 >
          </TitleWrapper>
        {this.state.toggle && 
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
         { TableGenerator}
          </tbody>
        </table>}
      </FilmTitle>
    );
  }
}

export default PlanetInfo;
