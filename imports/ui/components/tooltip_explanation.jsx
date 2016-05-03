// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';


export default class TooltipExplanation extends Component {

  render() {
    const tooltip = (
      <Popover title={this.props.title} id={this.props.id}>
        {this.props.body}
      </Popover>
    );

    return (
      <OverlayTrigger
        overlay={tooltip}
        placement="top"
        delayShow={300}
        delayHide={150}
      >
        <a href={this.props.href}>{this.props.children}<span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span> </a>
      </OverlayTrigger>
    );
  }
}
