import React, { Component } from "react";
import ObjectInList from "./ObjectInTable";
import styled from "styled-components";
import ArrowClose from "./assets/ARROWCLOSE.svg";
import ArrowOpen from "./assets/ARROWOPEN.svg";
import blackDownArrow from './assets/blackDownArrow.svg'
import blackUpArrow from './assets/blackUpArrow.svg'

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
    
    const AboutPlanetTable = styled.table`
      width:100%;
     p{
        font-family: 'Barlow', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        thead{
          border-bottom:1px solid black;
        }
        tr:first-child{
          color: #00687F;
        }
      }
    `;

  const HeadTable = styled.tr`

  `;


    /////Styles End///


class PlanetInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: [],
      toggle: false
    };
  }
FilterArrow = () =>{
 
       return <><img src={blackDownArrow}/><img src={blackUpArrow} /></>
    
 } 

 onSortFunction = (e) =>
 {
    console.log(e);
 }
  onToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  componentDidMount() {}

  render() {    

    const TableGenerator = this.props.planetInfo.planets.map((p, num) => (
      <ObjectInList key={num} open={this.state.expanded} PlanetNumber={p} />
    ));

    
    return (
      <TitleWrapper>
        <FilmTitle onClick={this.onToggle}>
          <div>
            <h1>{this.props.planetInfo.title}</h1>
          </div>
          <div>
            <img src={this.state.toggle ? ArrowClose : ArrowOpen} />
          </div>
        </FilmTitle>
        {this.state.toggle && (
          <AboutPlanetTable>
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
            <tbody>{TableGenerator}</tbody>
          </AboutPlanetTable>
        )}
      </TitleWrapper>
    );
  }
}

export default PlanetInfo;
