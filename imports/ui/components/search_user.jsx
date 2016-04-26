import React, { Component, PropTypes } from 'react';
import { Row, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';

import { SearchUsersIndex } from '../../api/users/users.js';

// import { debounce } from 'lodash';

export default class SearchUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchResults: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectUser = this.selectUser.bind(this);
    // this.onSelectUser = this.props.onSelectUser.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.renderUserThumbnail = this.renderUserThumbnail.bind(this);
  }

  searchUsers(searchString) {
    return SearchUsersIndex.search(searchString).fetch();
  }

  handleChange(event) {
    event.preventDefault();

    this.setState({
      searchString: event.target.value,
      searchResults: this.searchUsers(event.target.value),
    });
  }

  // selectUser(event) {
  //   event.preventDefault();
  //   // send selected user's username to parent component via callback
  //   this.props.onSelectUser(event.target.name);
  // }

  selectUser(userId) {
    return (event) => {
      event.preventDefault();
      // send selected user's username to parent component via callback
      this.props.onSelectUser(userId);
    };
  }

  renderUserThumbnail(user) {
    return (
      <EntityThumbnail
        key={user.username}
        imgLink="/images/avatar_placeholder_thumbnail.png"
        name={user.username}
        // onClick={this.selectUser}
        onClick={this.selectUser(user._id)}
        disabled={!user.selectable}
        // data-id={user._id}
      />
    );
  }

  render() {
    return (
      <div>
        <FormGroup controlId="searchBox">
          <ControlLabel>Search by username or email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.searchString}
            placeholder="e.g. jonsnow"
            onChange={this.handleChange}
          />
          <HelpBlock>Click a user below to select.</HelpBlock>
        </FormGroup>
        <Row>
          { this.state.searchResults ? this.state.searchResults.map(this.renderUserThumbnail) : '' }
        </Row>
      </div>
    );
  }
}

SearchUser.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
};
