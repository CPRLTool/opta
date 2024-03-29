import React, { Component, PropTypes } from 'react';
import { Row, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';

import { debounce } from 'lodash';

export default class SearchUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchResults: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.renderUserThumbnail = this.renderUserThumbnail.bind(this);
    this.delayedSearch = debounce(
      () => {
        this.setState({ searchResults: this.props.search(this.state.searchString) });
      },
      500
    );
  }

  handleChange(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.setState({
      searchString: event.target.value,
    });

    // set parent value so it can do something with it as needed
    if (this.props.setSearchString) {
      this.props.setSearchString(event.target.value);
    }

    this.delayedSearch();
  }

  // use fxn closure to get user obj
  selectUser(user) {
    return (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      // send selected user to parent component via callback
      this.props.onSelectUser(user);
    };
  }

  renderUserThumbnail(user) {
    return (
      <EntityThumbnail
        key={user.username}
        imgLink="/images/avatar_placeholder_thumbnail.png"
        name={user.username}
        onClick={this.selectUser(user)}
        disabled={!user.selectable}
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
          { this.state.searchString && this.state.searchResults
            ? this.state.searchResults.map(this.renderUserThumbnail)
            : ''
          }
        </Row>
      </div>
    );
  }
}

SearchUser.propTypes = {
  search: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  setSearchString: PropTypes.func,
};
