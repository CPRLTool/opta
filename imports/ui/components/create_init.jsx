import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Form, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';


export default class CreateInit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: 'blank',
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldEdit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const id = event.target.id;
    this.setState({ [id]: event.target.value });
  }

  // handleSelect(event) {
  //   this.setState({ owner: event.target.value });
  // }

  handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    console.log(this.state.owner);
    this.props.create({ owner: JSON.parse(this.state.owner), name: this.state.name });
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <span>
            <h3>Create an Initiative</h3>
            <br />
            <p>
              Choose a name, then select either an organization or yourself as the data owner.
              The data owner should be the user or organization providing the source of the data
              against which OPTA tracks.
            </p>
            <br />
          </span>
        </div>
        <Form horizontal>
          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
              Name
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="e.g. Alexander Hamilton HS Spring 2016"
                onChange={this.handleFieldEdit}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="owner">
            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
              Choose Data Owner
            </Col>
            <Col sm={6}>
              <FormControl
                componentClass="select"
                value={this.state.ownerId}
                onChange={this.handleFieldEdit}
                // onChange={this.handleSelect}
              >
                <option key="blankOption" value="blank"> -- select an option -- </option>
                { this.props.currUser
                  ? this.props.getOwnerOptions(this.props.currUser).map(
                    o => <option key={o.value.id} value={JSON.stringify(o.value)}>{ o.name }</option>
                  )
                  : ''
                }
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="submit">
            <Button
              type="submit"
              className="center-block"
              onClick={this.handleSubmit}
              bsStyle="success"
              disabled={!this.state.name || this.state.owner === 'blank'}
            >
                Create
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }

}

CreateInit.propTypes = {
  create: PropTypes.func.isRequired,
  currUser: PropTypes.object,
  getOwnerOptions: PropTypes.func.isRequired,
};
