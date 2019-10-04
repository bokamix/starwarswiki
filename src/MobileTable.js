import React, { Component } from "react";
import styled from "styled-components";
const TableWrapper = styled.div`
  display: flex;
  background: white;
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;
class ObjectInList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const data = this.props.data;
    return (
      <>
        <TableWrapper key={data.id}>
          <ul className="mobile-table">
            <li>name</li>
            <li>rotation_period</li>
            <li>orbital_period</li>
            <li>diameter</li>
            <li>climate</li>
            <li>surface_water</li>
            <li>population</li>
          </ul>
          <ul className="mobile-table">
            <li className="planet-name">{data.name}</li>
            <li>{data.rotation_period}</li>
            <li>{data.orbital_period}</li>
            <li>{data.diameter}</li>
            <li>{data.climate}</li>
            <li>{data.surface_water}</li>
            <li>{data.population}</li>
          </ul>
        </TableWrapper>
      </>
    );
  }
}

export default ObjectInList;
