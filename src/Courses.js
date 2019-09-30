import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Course from './Course';

const Courses = () => (
    <Query query={gql`
    {
        allPlanets{
          edges{
            node{
              name
              diameter
              gravity
              orbitalPeriod
              population
              climates
              terrains
              surfaceWater
              created
              edited
              id
            }
          }
        }
      }
    `}
    >
        {({loading, error, data}) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error :(</p>;
            
            return data.allPlanets.edges.map((node) => (
                console.log({node})
            ));
        }}
    </Query>
);

export default Courses;