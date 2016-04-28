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

  render() {
    return (
      <div className="container">
        <Form horizontal>
          <FormGroup>
            <div className="text-center">
              <h3>Create an Organization</h3>
            </div>
          </FormGroup>
          <SearchOrg
            setSearchString={this.setName}
            onSelectOrg={this.props.selectOrgFromSearchToCreate}
            hasError={this.state.hasError}
            // errorProp={this.state.errorProp}
          />
          <FormGroup>
            <Button
              type="submit"
              className="center-block"
              onClick={this.handleSubmit}
              bsStyle="success">
                Create
            </Button>
          </FormGroup>
        </Form>
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
