import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, ButtonGroup, Button } from 'react-bootstrap';


export default class OutcomeInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCreateMetric = this.handleCreateMetric.bind(this);
    this.handleSelectMetric = this.handleSelectMetric.bind(this);
  }

  handleFieldEdit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.props.updateOutcomeField(this.props.index, event.target.id, event.target.value);
  }

  handleRemove(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.props.removeOutcome(this.props.key);
  }

  handleCreateMetric(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
  }

  handleSelectMetric(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
  }

  renderAddMetricButtons() {
    return (
      <div className="text-center">
        <p style={{ display: 'inline-block' }}><strong>Add Metric:</strong>&nbsp;&nbsp;</p>
        <ButtonGroup style={{ display: 'inline-block' }}>
          <Button
            onClick={this.handleCreateMetric}
            // bsStyle="primary"
          >
            Create New &nbsp;<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </Button>
          <Button
            onClick={this.handleSelectMetric}
            // bsStyle="success"
          >
            Select Existing &nbsp;<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  render() {
    const opts = {};
    if (!this.props.editing) {
      opts.readOnly = 'readOnly';
    }

    return (
      <div>
        <hr />
        <Row className="vertical-align">
          <Col xs={4} xsOffset={4}>
            <div className="text-center">
              <h3>Outcome {this.props.index + 1}</h3>
            </div>
          </Col>
          { this.props.editing
            ?
              <Col xs={1} xsOffset={3}>
                <Button
                  onClick={this.handleRemove}
                  bsStyle="link"
                >
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </Button>
              </Col>
            : ''
          }
        </Row>
        <br />
        <Form horizontal>
          <FormGroup bsSize="lg" controlId="name">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.props.outcome ? this.props.outcome.name : ''}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
          <FormGroup controlId="description">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={8}>
              <FormControl
                componentClass="textarea"
                style={{ height: 120, resize: 'none' }}
                value={this.props.outcome ? this.props.outcome.description : ''}
                onChange={this.handleFieldEdit}
                {...opts} />
            </Col>
          </FormGroup>
          <br />
          <FormGroup>
            { this.props.editing ? this.renderAddMetricButtons() : '' }
          </FormGroup>
        </Form>
        <br />
      </div>
    );
  }
}

OutcomeInput.propTypes = {

};
