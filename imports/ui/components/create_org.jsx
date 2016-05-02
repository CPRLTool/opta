import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Form, Col, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

import SearchOrg from '../containers/search_org';

export default class CreateOrg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hasError: false,
      clearErrorTimeout: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setName = this.setName.bind(this);
  }

  handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const success = this.props.create({ name: this.state.name });

    if (success === false) {
      this.setState({
        hasError: true,
        clearErrorTimeout: setTimeout(() => this.setState({
          hasError: false,
        }), 3333),
      });
    }
  }

  setName(searchString) {
    this.setState({ name: searchString });
  }

  renderSubmitButton() {
    return (
      <Button
        type="submit"
        className="center-block"
        onClick={this.handleSubmit}
        bsStyle="success">
          Create
      </Button>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <span>
            <h3>Create an Organization</h3>
            <br />
            <p>Choose a unique name for your organization. Existing organizations will appear below as you type.</p>
            <br />
          </span>
        </div>
        <SearchOrg
          setSearchString={this.setName}
          onSelectOrg={this.props.selectOrgFromSearchToCreate}
          hasError={this.state.hasError}
          renderSubmit={this.renderSubmitButton.bind(this)}
        />
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.state.clearErrorTimeout);
  }

}

CreateOrg.propTypes = {
  create: PropTypes.func.isRequired,
  selectOrgFromSearchToCreate: PropTypes.func.isRequired,
};
