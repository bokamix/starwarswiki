import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import styled from "styled-components";
import DeleteButton from "./assets/DELETE.svg";
import StarLogo from "./assets/LOGO.svg";
import ArrowClose from "./assets/ARROWCLOSE.svg";
import ArrowOpen from "./assets/ARROWOPEN.svg";
import SearchIcon from './assets/SEARCH.svg';
import LoaderArrows from './assets/LoaderArrows.svg';

///style///

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  min-width: 736px;
  position:relative;

`;
const LoaderArrowsWrapper = styled.img`
      transform: rotate(360deg);
       transform-origin: top left;
      position:absolute;
      top:288px;
      left:371px;   
  `;


const LogoWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-top: 32px;
`;
const LogoImg = styled.img``;

const AddFilmWrapper = styled.div`
  width: 730px;
  background: white;
  margin: 0 auto;
`;
const InputsWrapper = styled.div`
  padding-top: 31px;
  width: 539px;
  margin: 0 auto;
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #474747;
`;
const ButtonLabel = styled.label`
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`;

const OneInputWrapper = styled.div`
    position:relative;
    :first-child{
      margin-bottom:17px;
    }
   img{
     position:absolute;
     bottom:7px;
     right:0;
   }
`;
  
const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px #999999 solid;
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #474747;
`;
const COPYRIGHTWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 36px;
  p {
    font-family: "Barlow", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */
    color: #999999;
  }
`;

const AddFilmButton = styled.div`
      display: flex;
      justify-content:flex-end;
      
      button{
        width: 160px;
        height: 33px;
        background: #1BA1BE;
        border-radius: 4px;
        text-align: center;
        margin:31px 0;
        text-decoration: none;
        border:none;
        p{
          margin-block-start: 0em;
          margin-block-end: 0em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-family: 'Barlow', sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          color: #FFFFFF;
          letter-spacing: 0.05em;   
          
  }}
`;
const ListOfSearchResult = styled.div`
  position:absolute;
  width: 540px;  
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(196, 196, 196, 0.5);
    p{
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-top:13px;
    padding-bottom:13px;
    padding-left:11px; 
    border-left: 1px solid #E5E5E5; 
    border-right: 1px solid #E5E5E5; 
  }
  p:first-child{
    border-top: 1px solid #E5E5E5; 
  }
  p:last-child {
    border-bottom: 1px solid #E5E5E5; 
  }
  
`;
const PlanetToAddWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    div{
      display:flex;
      align-items:baseline;
      flex-direction: row;
      border: 1px solid #999999;
      box-sizing: border-box;
      justify-content:center;
      border-radius: 18px;
      padding:3px 16px;    
      margin:10px;
      margin-left:0;  
      p{
        display: block;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        margin-right:13px;
        margin-top:6px;
        margin-bottom:6px;
      }
    }
`;

const AddFilmColapse = styled.div`
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


//style end//

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      value: ``,
      search: "",
      searchResult: [],
      planet: [],
      valueName: "",
      planetToAdd: [],
      planetToAddUrl: [],
      toggle: false,
      loadingFilms: true,
    };
  }
  ///Get Planet from SWAPI
  getFilms() {
    this.setState({loadingFilms: false})
    return axios
      .get(
        "https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/films"
      )
      .then(response => {
        this.setState({ films: response.data.results, loadingFilms:true });
        ///We will use Lodash to minimalize number of GET method
      ///Must add error message
      });
     
  }
  ///Get Planet from SWAPI when component is load
  componentDidMount() {    
    this.getFilms();    
  }
  onChangeValue = event => {
    this.setState({ valueName: event.target.value });
  };

  ///Search Event
  onHandleSearch = event => {
    this.setState({
      value: event.target.value,
      search: `https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/planets/?search=${this.state.value}`
    });    
    return axios.get(`${this.state.search}`).then(response => {
      if (response.data.results === undefined) {        
        ///We will use Lodash to minimalize number of GET method
///Must add error message
      } else {
        this.setState({ searchResult: response.data.results });
      }
    });
  };
  //event who add film to films list
  onAddItem = () => {
    this.setState(state => {
      this.state.searchResult.map((name, num) => {
        this.state.planet.push(`${name.url}`);
      });
      const films = [
        ...state.films,
        { title: state.valueName, planets: state.planetToAddUrl }
      ];

      return {
        films,
        value: "",
        valueName: "",
        planets: "",
        planet: [],
        planetToAdd: [],
        planetToAddUrl: []
      };
    });
  };
  //Event who add planet to custom film lists planet
  onAddPlanet = event => {
    let number = [...event.target.parentNode.children].indexOf(event.target);
    this.state.planetToAdd.push(`${this.state.searchResult[number].name}`);
    this.state.planetToAddUrl.push(`${this.state.searchResult[number].url}`);
    this.setState({ searchResult: [], value: "" }); //reset value

    //must add verification to double value
  };
  onDeletePlanet = num => {
    this.state.planetToAdd.splice(num, 1);
    this.state.planetToAddUrl.splice(num, 1);
    this.setState({ ...this.state.planetToAdd, ...this.state.planetToAddUrl }); //reset value
  };
  onToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const { films } = this.state;
    
    return (
      <div className="App">        
        <AppWrapper>
          <LogoWrapper>
            <a href=""><LogoImg src={StarLogo} /></a>
          </LogoWrapper>
          {!this.state.loadingFilms && <LoaderArrowsWrapper src={LoaderArrows}/> }
          <List films={films} />          
          <AddFilmWrapper>
          <AddFilmColapse onClick={this.onToggle}>
          <div>
            <h1>Add Planet</h1>
          </div>
          <div>
            <img src={this.state.toggle ? ArrowClose : ArrowOpen} />
          </div>
        </AddFilmColapse>
        {this.state.toggle && (<InputsWrapper>
              {/* Film to ADD*/}
              <OneInputWrapper>
              <ButtonLabel>Movie Title</ButtonLabel>              
                <StyledInput
                  type="text"
                  value={this.state.valueName}
                  onChange={this.onChangeValue}
                  placeholder="Please enter the tittle of the movie"
                />
              </OneInputWrapper>
                 <PlanetToAddWrapper>
                  {this.state.planetToAdd.map((name, num) => {
                    return (
                      <div key={num}>
                        <p>{name}</p>
                        <span onClick={() => this.onDeletePlanet(num)}>
                          <img src={DeleteButton} />
                        </span>
                      </div>
                    );
                  })}
               </PlanetToAddWrapper>   
              <OneInputWrapper>
                <img src={SearchIcon}/>
                <ButtonLabel>Add Planet</ButtonLabel>
                  <StyledInput
                    type="text"
                    value={this.state.value}
                    onChange={this.onHandleSearch}
                    placeholder="Seacrh for the the planet in database"
                  />
              </OneInputWrapper>
              <ListOfSearchResult>               
                {this.state.searchResult.map((name, num) => {
                  return (
                    <p onClick={this.onAddPlanet} key={num}>
                      {name.name}
                    </p>
                  );
                })}
              </ListOfSearchResult>
              <AddFilmButton>
                <button
                  type="button"
                  onClick={this.onAddItem}
                  disabled={!this.state.valueName}
                >
                  <p>ADD MOVIE</p>
                </button>
              </AddFilmButton>
            </InputsWrapper>)}
          </AddFilmWrapper>
          <COPYRIGHTWrapper>
            <p>COPYRIGHT © 2019 MIRUMEE SOFTWARE</p>
          </COPYRIGHTWrapper>
        </AppWrapper>
      </div>
    );
  }
}

export default App;
