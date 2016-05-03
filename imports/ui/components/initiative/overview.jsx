// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import TooltipExplanation from '../tooltip_explanation.jsx';


export default class OverviewAndStrategy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theoryOfAction: props.initiative ? (props.initiative.theoryOfAction || '') : '',
      overview: props.initiative ? (props.initiative.overview || '') : '',
      strategy: props.initiative ? (props.initiative.strategy || '') : '',
      editing: false,
      isSubmitting: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
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

    this.props.updateTextFields({
      _id: this.props.initiative._id,
      fields: {
        overview: this.state.overview,
        strategy: this.state.strategy,
      },
    });

    this.setState({ editing: false, isSubmitting: false });
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
            Edit Overview or Strategy
        </Button>;
  }

  render() {
    const opts = {};
    if (!this.state.editing) {
      opts.readOnly = 'readOnly';
    }

    const stratBody = (
      <p>A <strong>Strategy</strong> is...</p>
    );
    const overBody = (
      <p>A <strong>Strategy</strong> is...</p>
    );

    return (
      <div>
        <form>
          <div className="text-center">
            <h4>Overview</h4>
          </div>
          <p>
            Please provide any relevant background data and information.
          </p>
          <FormGroup controlId="overview">
            <FormControl
              componentClass="textarea"
              style={{ height: 120, resize: 'none' }}
              value={this.state.overview}
              onChange={this.handleFieldEdit}
              {...opts}
            />
          </FormGroup>
          <div className="text-center">
            <h5>Attached Documents</h5>
          </div>
          <br />
          <div className="text-center">
            <Button
              className="center-block"
              // onClick={this.toggleSave}
              bsStyle="default">
                Upload Documents...
            </Button>;
          </div>
          <br />
          <br />
          <div className="text-center">
            <h4>Strategy</h4>
          </div>
          <p>
            What is your main
            <TooltipExplanation
              id="strategy_tooltip"
              href="#"
              title="What is a Strategy?"
              body={stratBody}
            > Strategy </TooltipExplanation>
            for achieving the
            <TooltipExplanation
              id="outcome_tooltip"
              href="#"
              title="What is an Outcome?"
              body={overBody}
            > Outcomes </TooltipExplanation>
              which you will specify next?
          </p>
          <FormGroup controlId="strategy">
            <FormControl
              componentClass="textarea"
              style={{ height: 120, resize: 'none' }}
              value={this.state.strategy}
              onChange={this.handleFieldEdit}
              {...opts}
            />
          </FormGroup>
          <FormGroup>
            { this.props.canEdit ? this.renderEditButton() : ''}
          </FormGroup>
        </form>
      </div>
    );
  }
}

OverviewAndStrategy.propTypes = {
  currUser: PropTypes.object,
  initiative: PropTypes.object,
  canEdit: PropTypes.func.isRequired,
  updateTextFields: PropTypes.func.isRequired,
};
