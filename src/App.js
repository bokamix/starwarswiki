import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import DeleteButton from "./assets/DELETE.svg";
import StarLogo from "./assets/LOGO.svg";
import ArrowClose from "./assets/ARROWCLOSE.svg";
import ArrowOpen from "./assets/ARROWOPEN.svg";
import SearchIcon from "./assets/SEARCH.svg";
import LoaderArrows from "./assets/LoaderArrows.png";

///style///

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media all and (min-width: 806px) {
    min-width: 736px;
  }
  position: relative;
`;
const spin = keyframes`
    from {transform: rotate(0deg);}
    to    {transform: rotate(360deg);}
    `;

const LoaderArrowsWrapper = styled.img`
  position: absolute;
  top: 288px;
  left: 45%;
  @media all and (min-width: 806px) {
    left: 371px;
  }
  transform-origin: center;
  -webkit-animation: ${spin} 2s ease-in-out infinite;
  -moz-animation: ${spin} 2s ease-in-out infinite;
  animation: ${spin} 2s ease-in-out infinite;
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-top: 32px;
`;
const LogoImg = styled.img`
  width: 222px;
  @media all and (min-width: 806px) {
    width: 315px;
  }
`;

const AddFilmWrapper = styled.div`
  @media all and (min-width: 806px) {
    width: 730px;
  }

  background: white;
  margin: 0 auto;
  margin: 16px 30px;
`;
const InputsWrapper = styled.div`
  padding-top: 31px;
  margin: 0 auto;
  margin: 16px 30px;
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #474747;
`;
const ErrorValidationComunicat = styled.div`
  width: 100%;
  height: 42px;
  @media all and (min-width: 428px) {
    height: 32px;
  }
  border: red 1px solid;
  box-shadow: 0px 4px 4px rgba(196, 196, 196, 0.5);
  p {
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-family: "Barlow", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    padding-left: 8px;
    margin-top: 7px;
  }
`;

const ButtonLabel = styled.label`
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`;

const OneInputWrapper = styled.div`
  position: relative;
  @media all and (min-width: 806px) {
    width: 540px;
  }
  margin: 0 auto;
  :first-child {
    margin-bottom: 17px;
  }
  img {
    position: absolute;
    bottom: 7px;
    right: 0;
  }
`;

const COPYRIGHTWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 31px;
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
  justify-content: flex-end;

  button {
    cursor: pointer;
    width: 160px;
    height: 33px;
    background: #1ba1be;
    border-radius: 4px;
    text-align: center;
    margin: 31px 0;
    text-decoration: none;
    border: none;
    p {
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-family: "Barlow", sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      color: #ffffff;
      letter-spacing: 0.05em;
    }
  }
`;
const ListOfSearchResult = styled.div`
  position: absolute;
  width: 100%;
  @media all and (min-width: 806px) {
    width: 540px;
  }
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(196, 196, 196, 0.5);
  p {
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: 11px;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  p:first-child {
    border-top: 1px solid #e5e5e5;
  }
  p:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
`;

const PlanetToAddWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media all and (min-width: 806px) {
    width: 540px;
  }
  margin: 0 auto;
  div {
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-direction: row;
    border: 1px solid #999999;
    box-sizing: border-box;
    border-radius: 18px;
    padding: 3px 16px;
    margin: 10px;
    margin-left: 0;
    p {
      display: block;
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      margin-right: 13px;
      margin-top: 6px;
      margin-bottom: 6px;
    }
  }
`;
const OpenClosseArrowWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const AddFilmColapse = styled.div`
  cursor: pointer;
  background: white;
  display: flex;
  flex-wrap: nowrap;
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
      filmTitleValidation: false,
      onBlurFilmTitle: false
    };
  }
  ///Get Planet from SWAPI
  getFilms() {
    this.setState({ loadingFilms: false });
    return axios
      .get(
        "https://mighty-chamber-74291.herokuapp.com/https://swapi.co/api/films"
      )
      .then(response => {
        this.setState({ films: response.data.results, loadingFilms: true });
      })
      .catch(err => {
        console.log(`Error, not conection with SWAPI. Number of error: ${err}`);
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
    return axios
      .get(`${this.state.search}`)
      .then(response => {
        if (response.data.results === undefined) {
        } else {
          this.setState({ searchResult: response.data.results });
        }
      })
      .catch(err => {
        console.log(`Error, not conection with SWAPI. Number of error: ${err}`);
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
        planetToAddUrl: [],
        filmTitleValidation: false,
        onBlurFilmTitle: false
      };
    });
  };
  //Event adding planet to custom film lists planet
  onAddPlanet = event => {
    let number = [...event.target.parentNode.children].indexOf(event.target);
    this.state.planetToAdd.push(`${this.state.searchResult[number].name}`);
    this.state.planetToAddUrl.push(`${this.state.searchResult[number].url}`);
    this.setState({ searchResult: [], value: "" }); //reset value
  };
  ///Reset list when onBlur

  //must add verification to double value

  onDeletePlanet = num => {
    this.state.planetToAdd.splice(num, 1);
    this.state.planetToAddUrl.splice(num, 1);
    this.setState({ ...this.state.planetToAdd, ...this.state.planetToAddUrl }); //reset value
  };
  onToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  onBlurTitle = () => {
    this.setState({ onBlurFilmTitle: true });

    if (
      this.state.valueName.length > 2 &&
      /^[A-Z]/.test(this.state.valueName)
    ) {
      this.setState({ filmTitleValidation: true });
    } else this.setState({ filmTitleValidation: false });
  };

  render() {
    const { films } = this.state;

    return (
      <div className="App">
        <AppWrapper>
          <LogoWrapper>
            <a href="">
              <LogoImg src={StarLogo} />
            </a>
          </LogoWrapper>

          {!this.state.loadingFilms && (
            <LoaderArrowsWrapper src={LoaderArrows} />
          )}
          <List films={films} />
          <AddFilmWrapper>
            <AddFilmColapse onClick={this.onToggle}>
              <div>
                <h1>Add movie</h1>
              </div>
              <OpenClosseArrowWrapper>
                <img src={this.state.toggle ? ArrowClose : ArrowOpen} />
              </OpenClosseArrowWrapper>
            </AddFilmColapse>
            {this.state.toggle && (
              <InputsWrapper>
                {/* Film to ADD*/}
                <OneInputWrapper>
                  <ButtonLabel
                    className={
                      !this.state.filmTitleValidation &&
                      this.state.onBlurFilmTitle
                        ? `errorTitle`
                        : ``
                    }
                  >
                    Movie Title
                  </ButtonLabel>
                  <StyledInput
                    type="text"
                    value={this.state.valueName}
                    onChange={this.onChangeValue}
                    onBlur={this.onBlurTitle}
                    placeholder="Please enter the tittle of the movie"
                  />
                  {!this.state.filmTitleValidation &&
                  this.state.onBlurFilmTitle ? (
                    <ErrorValidationComunicat>
                      <p>Movie tittle name must start with a capital letter.</p>
                    </ErrorValidationComunicat>
                  ) : (
                    ``
                  )}
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
                  <img src={SearchIcon} />
                  <ButtonLabel>Add Planet</ButtonLabel>
                  <StyledInput
                    type="text"
                    value={this.state.value}
                    onChange={this.onHandleSearch}
                    placeholder="Seacrh for the the planet in database"
                  />
                  <ListOfSearchResult>
                    {this.state.searchResult.map((name, num) => {
                      return (
                        <p onClick={this.onAddPlanet} key={num}>
                          {name.name}
                        </p>
                      );
                    })}
                  </ListOfSearchResult>
                </OneInputWrapper>

                <AddFilmButton>
                  <button
                    className={
                      !this.state.filmTitleValidation ? `errorButton` : ``
                    }
                    type="button"
                    onClick={this.onAddItem}
                    disabled={!this.state.filmTitleValidation}
                  >
                    <p>ADD MOVIE</p>
                  </button>
                </AddFilmButton>
              </InputsWrapper>
            )}
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
