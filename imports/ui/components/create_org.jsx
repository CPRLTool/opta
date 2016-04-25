import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Form, Col, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { create } from '../../api/organizations/methods.js';

export default class CreateOrg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      errorProp: {},
      helpText: 'Choose a name unique to the OPTA system.',
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldEdit(event) {
    event.preventDefault();
    const id = event.target.id;
    this.setState({ [id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const fields = {
      name: this.state.name,
    };
    create.call(fields, (err, res) => {
      if (err) {
        console.log(err);
        this.setState({
          errorProp: { validationState: 'error' },
          helpText: 'Name already exists.',
        });
      } else {
        FlowRouter.go(`/organization/${this.state.name}`);
      }
    });
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
          <FormGroup controlId="name" {...this.state.errorProp} >
            <Col componentClass={ControlLabel} sm={2}>Name</Col>
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.state.name}
                onChange={this.handleFieldEdit} />
              <FormControl.Feedback />
              <HelpBlock>{this.state.helpText}</HelpBlock>
            </Col>
          </FormGroup>
            <Button
              type="submit"
              className="center-block"
              onClick={this.handleSubmit}
              bsStyle="success">
                Create
            </Button>
        </Form>
      </div>
    );
  }
}
