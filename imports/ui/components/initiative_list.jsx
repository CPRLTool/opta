import React from 'react';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';


const InitiativeListItem = ({ initiative }) => (
  <ListGroupItem header={initiative.name} href={`/initiative/${initiative._id}/dashboard`}>
    { initiative.theoryOfAction }
  </ListGroupItem>
);

const InitiativeList = ({ initiatives }) => (
  <Col sm={10} smOffset={1}>
    <ListGroup>
      { initiatives
        ? initiatives.map(i => <InitiativeListItem key={i._id} initiative={i} />)
        : ''
      }
    </ListGroup>
  </Col>
);

export default InitiativeList;
