import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Image, Form, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import { updateProfile } from '../../api/organizations/methods.js';

export default class OrgProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // name: props.org ? props.org.name : '',
      about: props.org ? (props.org.about || '') : '',
      editing: false,
      isSubmitting: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  isAdmin() {
    return this.props.org && this.props.currUser && this.props.org.editableBy(this.props.currUser._id);
  }

  handleFieldEdit(event) {
    event.preventDefault();
    const id = event.target.id;
    this.setState({ [id]: event.target.value });
  }

  toggleSave(event) {
    event.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  handleSave(event) {
    event.preventDefault();

    const fields = {
      _id: this.props.org._id,
      about: this.state.about,
    };
    updateProfile.call(fields);

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
    if (!this.isAdmin() || (this.isAdmin() && !this.state.editing)) {
      opts.readOnly = 'readOnly';
    }

    return (
      <div className="container">
        <Form horizontal>
          <FormGroup controlId="formAvatar">
            <Image src="/images/org_logo_placeholder.png" className="center-block" rounded responsive  />
          </FormGroup>
          <FormGroup>
            { this.isAdmin() ? this.renderEditButton() : ''}
          </FormGroup>
          <FormGroup controlId="username">
            <Col componentClass={ControlLabel} sm={2}>Name</Col>
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.props.org ? this.props.org.name : ''}
                readOnly />
            </Col>
          </FormGroup>
          <FormGroup controlId="about">
            <Col componentClass={ControlLabel} sm={2}>About</Col>
            <Col sm={8}>
              <FormControl
                componentClass="textarea"
                value={this.state.about}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

OrgProfile.propTypes = {
  org: PropTypes.object.isRequired,
  currUser: PropTypes.object.isRequired,
};
