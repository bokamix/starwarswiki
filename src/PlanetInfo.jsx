import React, { Component } from "react";
import ObjectInList from "./ObjectInTable";
import styled from "styled-components";
import ArrowClose from "./assets/ARROWCLOSE.svg";
import ArrowOpen from "./assets/ARROWOPEN.svg";
import SortArrows from './assets/SortArrows.svg'
const swapi = require("swapi-node");

  /////Styles ////
const FilmTitle = styled.div`
      background: white;
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      height:48px;
      align-items: baseline;
      justify-content: space-between;
      border-radius: 4px;
      box-shadow: 0px 2px 1px rgba(196, 196, 196, 0.2);
      h1 {
        color: #00687F;
        font-family: 'Barlow', sans-serif;
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
      width: 730px;
      margin: 16px 30px;
      background: white;
    `;

  const HeadTable = styled.tr`

  `;
/////Styles End///


class PlanetInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: [],
      toggle: true,
      planetsInfo:[],
      loadingPlanets:false,
    };
  }
FilterArrow = () =>{ 
         return <><img src={SortArrows}/></>    
 } 
 
 getPlanets= () => {    
  this.props.filmInfo.planets.map((p, num) => {
    this.setState({ loadingPlanets: false}, () => { 
    console.log(this.state.loadingPlanets)
  swapi.get(` https://mighty-chamber-74291.herokuapp.com/${p}`).then(result => {
    this.state.planetsInfo.push(result);
    setTimeout(()=>this.setState({ loadingPlanets: true}), 1200);    
    console.log(this.state.loadingPlanets)    
    ///Must add error message
  });
  })
})
}


 onSortFunction = (e) =>
 {
    console.log(e);
 }
  onToggle = () => {
    this.setState({ toggle: !this.state.toggle });
    this.getPlanets();
    console.log(this.state.loadingPlanets)
  };
 



  componentDidMount() {
    
  }

  render() {    
    console.log(this.state.loadingPlanets)
    const AboutPlanetTable = styled.table`
    width:100%;
    height: ${`${55*this.props.filmInfo.planets.length}px`};      
   p{
      font-family: 'Barlow', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      position:relative;
      img{
        margin-left:6px;
        position:absolute;
        bottom:1;
      }
    }
      thead{
        border-bottom:1px solid black;
      }                
      tr{                   
         td:first-child{
         color: #00687F;       
         }
            th:first-child{
            color: #00687F;       
        }}
      td{
        text-align:center;        
      }
      
    
  `;

    return (
      
      <TitleWrapper>
        <FilmTitle onClick={this.onToggle}>        
          <div>
            <h1>{this.props.filmInfo.title}</h1>
          </div>
          <div>
            <img src={this.state.toggle ? ArrowClose : ArrowOpen} />
          </div>
        </FilmTitle>
        {!this.state.toggle && <AboutPlanetTable>         
          {this.state.loadingPlanets && <>
            <thead>
              <HeadTable>
                <th><p onClick={this.onSortFunction}>Planet Name{this.FilterArrow()}</p></th>
                <th><p>Rotation period{this.FilterArrow()}</p></th>
                <th><p>Orbital period{this.FilterArrow()}</p></th>
                <th><p>Diameter{this.FilterArrow()}</p></th>
                <th><p>Climate{this.FilterArrow()}</p></th>
                <th><p>Surface water{this.FilterArrow()}</p></th>
                <th><p>Population{this.FilterArrow()}</p></th>
              </HeadTable>
            </thead>
            <tbody>
          {this.state.planetsInfo.map((p, num) => {
            return(
              <tr key={num}>
                <td><p>{p.name}</p></td>
                <td><p>{p.rotation_period}</p></td>
                <td><p>{p.orbital_period}</p></td>
                <td><p>{p.diameter}</p></td>
                <td><p>{p.climate}</p></td>
                <td><p>{p.surface_water}</p></td>
                <td><p>{p.population}</p></td>
              </tr>
            )
          })} 
            </tbody>
            </>}
            </AboutPlanetTable>
        }
        
      </TitleWrapper>
    );
  }
}

export default PlanetInfo;
