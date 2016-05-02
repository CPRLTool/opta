import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


const InitiativeListItem = ({ initiative }) => (
  <ListGroupItem header={initiative.name} href={`/initiative/${initiative._id}`}>
    { initiative.theoryOfAction }
  </ListGroupItem>
);

const InitiativeList = ({ initiatives }) => (
  <ListGroup>
    { initiatives
      ? initiatives.map(i => <InitiativeListItem initiative={i} />)
      : ''
    }
  </ListGroup>
);

export default InitiativeList;
