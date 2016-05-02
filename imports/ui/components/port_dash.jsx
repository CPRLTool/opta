// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Image, Form, Row, Col, FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';
import InitiativeList from './initiative_list.jsx';

export default class PortDash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      impact: props.portfolio ? (props.portfolio.impact || '') : '',
      editing: false,
      isSubmitting: false,
      showModal: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleFieldEdit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const id = event.target.id;
    this.setState({ [id]: event.target.value });
  }

  toggleSave(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.setState({ editing: !this.state.editing });
  }

  handleSave(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.props.update({
      _id: this.props.portfolio._id,
      impact: this.state.impact,
    });

    this.setState({ editing: false, isSubmitting: false });
  }

  renderEditButton() {
    const isSub = this.state.isSubmitting;
    return this.state.editing
      ? <Button
          type="submit"
          className="center-block"
          disabled={isSub}
          onClick={!isSub ? this.handleSave : null}
          bsStyle="success">
            {isSub ? 'Saving...' : 'Save'}
        </Button>
      : <Button
          className="center-block"
          onClick={this.toggleSave}
          bsStyle="primary">
            Edit
        </Button>;
  }

  render() {
    const opts = {};
    const canEdit = this.props.canEdit(this.props.currUserId, this.props.portfolio);
    if (!canEdit || (canEdit && !this.state.editing)) {
      opts.readOnly = 'readOnly';
    }

    return (
      <div className="container">
        <div className="text-center">
            <h2>{this.props.portfolio ? this.props.portfolio.name : ''}</h2>
        </div>
        <br />
        <Form horizontal>
          <FormGroup controlId="impact">
            <Col componentClass={ControlLabel} sm={2}>Impact</Col>
            <Col sm={8}>
              <FormControl
                componentClass="textarea"
                style={{ height: 120, resize: 'none' }}
                value={this.state.impact}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
          <FormGroup>
            { canEdit ? this.renderEditButton() : ''}
          </FormGroup>
        </Form>
        <br />
        <hr />
        <Row>
          <Col sm={4} smOffset={4}>
            <h4>Initiatives</h4>
            <Button
              href="/initiatives/create"
            >
              Create
            </Button>
          </Col>
        </Row>
        <br />
        { this.props.portfolio
          ? <InitiativeList initiatives={this.props.getInitiatives(this.props.portfolio)} />
          : ''
        }
      </div>
    );
  }
}

PortDash.propTypes = {
  portfolio: PropTypes.object,
  currUserId: PropTypes.string,
  canEdit: PropTypes.func,
  update: PropTypes.func,
  getInitiatives: PropTypes.func,
};
