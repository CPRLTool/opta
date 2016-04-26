import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';

import { searchUsers } from '../../api/users/methods.js';

// import { debounce } from 'lodash';


export default class SearchUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      searchString: '',
      selectedUser: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectUser = this.selectUser.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ searchString: event.target.value });
  }

  // onSubmit(event) {
  //   event.preventDefault();
  // }

  getSearchResults() {
    // // callback subscription to search
    // this.props.searchSub(this.state.searchString);

    // now call search method
    return searchUsers.call({ searchString: this.state.searchString });
  }

  selectUser(event) {
    event.preventDefault();
    // send selected user's username to parent component via callback
    this.props.onSelectUser(event.target.value);
  }

  renderUserThumbnails(user) {
    return (
      <EntityThumbnail
        key={user.username}
        imgLink="/images/avatar_placeholder_thumbnail.png"
        name={user.username}
        onClick={this.selectUser}
      />
    );
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup controlId="searchString">
            <ControlLabel>Search by username or email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.searchString}
              placeholder="e.g. jonsnow"
              onChange={this.handleChange}
              // onChange={debounce(this.handleChange, 300)}
            />
          </FormGroup>
          <Row>
            { this.getSearchResults().map(this.renderUserThumbnails) }
          </Row>
          {/*
          <FormGroup controlId="submitSearchUser">
            <Button
              type="submit"
              className="center-block"
              disabled={this.state.isSubmitting}
              onClick={!this.state.isSubmitting ? this.onSubmit : null}
              bsStyle="success">
                {this.state.isSubmitting ? 'Submitting...' : 'Select User'}
            </Button>
          </FormGroup>
          */}

        </Form>
      </div>
    );
  }
}

SearchUser.propTypes = {
  // searchSub: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
};
