import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';

const EntityThumbnail = ({ imgLink, name, onClick, disabled }) => {
  const props = { disabled };
  if (typeof(onClick) === 'string') {
    // it's a link
    props.href = onClick;
  } else {
    // it's a real button, onClick behavior
    props.onClick = onClick;
  }

  return (
    <Col xs={6} sm={3} md={2}>
      <Button bsStyle="link" block {...props} >
        <Image src={ imgLink } className="center-block" rounded />
        <div className="text-center">
            <h5>{ name }</h5>
        </div>
      </Button>
    </Col>
  );
};

export default EntityThumbnail;
