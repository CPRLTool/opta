import React, { Component, PropTypes } from 'react';
import { Image, Form, Row, Col, FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';
import SearchUser from '../containers/search_user';

export default class OrgProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      about: props.org ? (props.org.about || '') : '',
      editing: false,
      isSubmitting: false,
      showModal: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toggleSearchUser = this.toggleSearchUser.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
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
      _id: this.props.org._id,
      about: this.state.about,
    });

    this.setState({ editing: false, isSubmitting: false });
  }

  toggleSearchUser(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.setState({ showModal: !this.state.showModal });
  }

  handleInvite(user) {
    this.props.inviteMember({
      org: this.props.org,
      user,
    });

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
    const isAd = this.props.isAdmin(this.props.currUser, this.props.org);
    if (!isAd || (isAd && !this.state.editing)) {
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
                style={{ height: 120, resize: 'none' }}
                value={this.state.about}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
          <FormGroup controlId="editAndSave">
            { this.isAd ? this.renderEditButton() : '' }
          </FormGroup>
        </Form>
        <hr />
        <div className="text-center">
          <h4>Members</h4>
        </div>
        <Row>
          { this.props.org
            ? this.props.members(this.props.org).map(this.renderUserThumbnails)
            : ''
          }
          { isAd ? this.renderInviteButton() : '' }
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
  currUser: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired,
  isAdmin: PropTypes.func.isRequired,
  members: PropTypes.func.isRequired,
  updateProfile: PropTypes.func,
  inviteMember: PropTypes.func,
};
