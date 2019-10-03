import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import styled from "styled-components";
import DeleteButton from "./assets/DELETE.svg";
import StarLogo from "./assets/LOGO.svg";

///style///

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  min-width: 736px;
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
    margin-bottom:17px;
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
          
  }}}
`;
const ListOfSearchResult = styled.div`
  position:absolute;
  width: 540px;  
  background: #FFFFFF;
  p{
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-top:13px;
    margin-bottom:13px;
    margin-left:11px; 
    
  }
  
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
      planetToAddUrl: []
    };
  }
  ///Get Planet from SWAPI
  getFilms() {
    return axios
      .get(
        "https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/films"
      )
      .then(response => {
        this.setState({ films: response.data.results });
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
    ///We will use Lodash to minimalize number of GET method

    return axios.get(`${this.state.search}`).then(response => {
      if (response.data.results === undefined) {
        console.log("kdas");
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

  render() {
    const { films } = this.state;

    return (
      <div className="App">
        <AppWrapper>
          <LogoWrapper>
            <LogoImg src={StarLogo} />
          </LogoWrapper>
          <List films={films} />

          <AddFilmWrapper>
            <InputsWrapper>
              {/* Film to ADD*/}
              <ButtonLabel>Movie Title</ButtonLabel>
              <OneInputWrapper>
                <StyledInput
                  type="text"
                  value={this.state.valueName}
                  onChange={this.onChangeValue}
                  placeholder="Please enter the tittle of the movie"
                />
              </OneInputWrapper>
              {/* Planet to ADD */}
              {this.state.planetToAdd.map((name, num) => {
                return (
                  <div key={num}>
                    <p>{name}</p>
                    <div onClick={() => this.onDeletePlanet(num)}>
                      <img src={DeleteButton} />
                    </div>
                  </div>
                );
              })}
              <ButtonLabel>Add Planet</ButtonLabel>
              <OneInputWrapper>
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
            </InputsWrapper>
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
