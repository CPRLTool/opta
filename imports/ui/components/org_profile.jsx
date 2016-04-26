import React, { Component, PropTypes } from 'react';
import { Image, Form, Row, Col, FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';
import SearchUser from '../containers/org_invite_search_user.js';

import { updateProfile } from '../../api/organizations/methods.js';
import { inviteMember } from '../../api/organizations/methods.js';

export default class OrgProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // name: props.org ? props.org.name : '',
      about: props.org ? (props.org.about || '') : '',
      editing: false,
      isSubmitting: false,
      showModal: false,
      searchUser: '',
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toggleSearchUser = this.toggleSearchUser.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }

  isAdmin() {
    return this.props.org
      && this.props.currUser
      && this.props.org.editableBy(this.props.currUser._id);
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

  toggleSearchUser(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ showModal: !this.state.showModal });
  }


  // handleInvite(usernameToInvite) {
  handleInvite(inviteeId) {
    const fields = {
      _id: this.props.org._id,
      // username: usernameToInvite,
      inviteeId,
    };

    inviteMember.call(fields);

    this.setState({ showModal: false });
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

  renderUserThumbnails(user) {
    return (
      <EntityThumbnail
        key={user.username}
        imgLink="/images/avatar_placeholder_thumbnail.png"
        name={user.username}
        onClick={`/user/${user.username}`}
      />
    );
  }

  renderInviteButton() {
    return (
      <EntityThumbnail
        key="add_member"
        imgLink="/images/add_member.png"
        name="Add Member..."
        onClick={this.toggleSearchUser}
      />
    );
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
            <Image src="/images/org_logo_placeholder.png" className="center-block" rounded responsive />
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
          <FormGroup controlId="editAndSave">
            { this.isAdmin() ? this.renderEditButton() : '' }
          </FormGroup>
        </Form>
        <hr />
        <div className="text-center">
          <h4>Members</h4>
        </div>
        <Row>
          { this.props.org.users().map(this.renderUserThumbnails) }
          { this.isAdmin() ? this.renderInviteButton() : '' }
        </Row>
        <Modal show={this.state.showModal} onHide={this.toggleSearchUser}>
          <Modal.Header closeButton>
            <Modal.Title>Search for User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchUser org={this.props.org} onSelectUser={this.handleInvite} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleSearchUser}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

OrgProfile.propTypes = {
  org: PropTypes.object.isRequired,
  currUser: PropTypes.object.isRequired,
  searchSub: PropTypes.func,
};
