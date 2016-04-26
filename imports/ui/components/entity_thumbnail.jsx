import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';

const EntityThumbnail = ({ imgLink, name, onClick }) => {
  const props = {};
  if (typeof(onClick) === 'string') {
    // it's a link
    props.href = onClick;
  } else {
    // it's a real button, onClick behavior
    props.onClick = onClick;
  }

  // return (
  //   <Col xs={6} sm={4} md={3}>
  //     <Thumbnail src={ imgLink }>
  //       <div className="text-center">
  //         <Button bsStyle="link" {...props} >
  //           <h5>{ name }</h5>
  //         </Button>
  //       </div>
  //     </Thumbnail>
  //   </Col>
  // );
  return (
    <Col xs={6} sm={3} md={2}>
      <Image src={ imgLink } className="center-block" rounded />
      <div className="text-center">
        <Button bsStyle="link" {...props} >
          <h5>{ name }</h5>
        </Button>
      </div>
    </Col>
  );
};

export default EntityThumbnail;
