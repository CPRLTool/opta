// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Image, Form, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';


export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user ? (props.user.firstName || '') : '',
      lastName: props.user ? (props.user.lastName || '') : '',
      bio: props.user ? (props.user.bio || '') : '',
      editing: false,
      isSubmitting: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  isCurrUser() {
    return this.props.currUser && this.props.user && this.props.currUser._id === this.props.user._id;
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

    this.props.updateProfile({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bio: this.state.bio,
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

  renderOrgThumbnails(org) {
    return (
      <EntityThumbnail
        key={org.name}
        imgLink="/images/org_logo_placeholder_thumbnail.png"
        name={org.name}
        onClick={`/organization/${org.name}`}
      />
    );
  }

  render() {
    const opts = {};
    if (!this.isCurrUser() || (this.isCurrUser() && !this.state.editing)) {
      opts.readOnly = 'readOnly';
    }

    return (
      <div className="container">
        <Form horizontal>
          <FormGroup controlId="formAvatar">
            <Image src="/images/avatar_placeholder.png" className="center-block" rounded responsive />
          </FormGroup>
          <FormGroup controlId="username">
            <Col componentClass={ControlLabel} sm={2}>Username</Col>
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.props.user ? this.props.user.username : ''}
                readOnly />
            </Col>
          </FormGroup>
          {/*
          <FormGroup controlId="email">
            <Col componentClass={ControlLabel} sm={2}>Email</Col>
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.props.user ? this.props.user.emails[0].address : ''}
                readOnly />
            </Col>
          </FormGroup>
        */}
          <FormGroup controlId="firstName">
            <Col componentClass={ControlLabel} sm={2}>First Name</Col>
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.state.firstName}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
          <FormGroup controlId="lastName">
            <Col componentClass={ControlLabel} sm={2}>Last Name</Col>
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.state.lastName}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
          <FormGroup controlId="bio">
            <Col componentClass={ControlLabel} sm={2}>Bio</Col>
            <Col sm={8}>
              <FormControl
                componentClass="textarea"
                style={{ height: 120, resize: 'none' }}
                value={this.state.bio}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
          <FormGroup>
            { this.isCurrUser() ? this.renderEditButton() : ''}
          </FormGroup>
        </Form>
        <br />
        <hr />
        <br />
        <div className="text-center">
          <h4>Organizations</h4>
        </div>
        <br />
        <Row>
          { this.props.user ? this.props.orgsOf(this.props.user).map(this.renderOrgThumbnails) : '' }
        </Row>
      </div>
    );
  }
}

UserProfile.propTypes = {
  // user: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  currUser: PropTypes.object.isRequired,
  orgsOf: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};
