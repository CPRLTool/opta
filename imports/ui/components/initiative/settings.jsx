import React, { Component, PropTypes } from 'react';
import { Image, Form, Row, Col, FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import EntityThumbnail from '../entity_thumbnail.jsx';
import SearchUser from '../../containers/search_user';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
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

  toggleSearchUser(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.setState({ showModal: !this.state.showModal });
  }

  handleInvite(user) {
    this.props.inviteMember({
      initiative: this.props.initiative,
      user,
    });

    this.setState({ showModal: false });
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
    const canEdit = this.props.canEdit(this.props.currUser._id, this.props.initiative);

    return (
      <div>
        <Button
          className="center-block"
          // onClick={this.toggleSave}
          bsStyle="success">
            End Setup and Start Tracking
        </Button>
        <br />
        <br />
        <div className="text-center">
          <h4>Members</h4>
        </div>
        <Row>
          { this.props.initiative
            ? this.props.getMembers(this.props.initiative).map(this.renderUserThumbnails)
            : ''
          }
          { canEdit ? this.renderInviteButton() : '' }
        </Row>
        <Modal show={this.state.showModal} onHide={this.toggleSearchUser}>
          <Modal.Header closeButton>
            <Modal.Title>Search for User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchUser group={this.props.initiative} onSelectUser={this.handleInvite} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleSearchUser}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Settings.propTypes = {
  currUser: PropTypes.object,
  initiative: PropTypes.object,
  canEdit: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  inviteMember: PropTypes.func,
};
